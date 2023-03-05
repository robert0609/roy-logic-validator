import typer from '@xes/dh-module-type';
import * as rules from './index';

const ruleNames = Object.keys(rules);

export function ifHasValue(value) {
  let continueFlow = !typer.isNullOrUndefined(value);

  let ret = {};

  ruleNames.forEach(ruleName => {
    ret[ruleName] = function (...params) {
      if (continueFlow) {
        rules[ruleName](...params);
      }
      return ret;
    };
  });

  return ret;
}

export function whenTypeIs(type, typeRange = []) {
  let continueFlow = typeRange.includes(type);

  let ret = {};

  ruleNames.forEach(ruleName => {
    ret[ruleName] = function (...params) {
      if (continueFlow) {
        try {
          rules[ruleName](...params);
        } catch (e) {
          throw `对于${type}类型，${e}`;
        }
      }
      return ret;
    };
  });

  ret.ifHasValue = function (value) {
    if (continueFlow) {
      continueFlow = !typer.isNullOrUndefined(value);
    }
    return ret;
  };

  return ret;
}
