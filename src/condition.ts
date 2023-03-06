import { isNullOrUndefined } from 'roy-type-assert';
import rules from './rule';
import type { IRules } from './rule';

type RuleNames = keyof IRules;
type RuleChain = Record<
  RuleNames,
  <T extends RuleNames>(...args: Parameters<IRules[T]>) => RuleChain
>;

const ruleNames = Object.keys(rules) as RuleNames[];

export function ifHasValue(value: any) {
  const continueFlow = !isNullOrUndefined(value);

  const ret = {} as RuleChain;

  ruleNames.forEach((ruleName) => {
    ret[ruleName] = function (...params) {
      if (continueFlow) {
        (rules[ruleName] as (...args: any[]) => void)(...params);
      }
      return ret;
    };
  });

  return ret;
}

export function whenFieldFulfills(
  fieldName: string,
  fieldValue: string,
  fieldValueRange: string[] = []
) {
  let continueFlow = fieldValueRange.includes(fieldValue);

  const ret = {} as RuleChain & { ifHasValue: typeof ifHasValue };

  ruleNames.forEach((ruleName) => {
    ret[ruleName] = function (...params) {
      if (continueFlow) {
        try {
          (rules[ruleName] as (...args: any[]) => void)(...params);
        } catch (e) {
          throw `对于${fieldName}字段，${e}`;
        }
      }
      return ret;
    };
  });

  ret.ifHasValue = function (value) {
    if (continueFlow) {
      continueFlow = !isNullOrUndefined(value);
    }
    return ret;
  };

  return ret;
}
