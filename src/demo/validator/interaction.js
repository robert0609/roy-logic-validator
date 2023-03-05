/**
 * catalyst 交互组件配置校验器
 */
import typer from '@xes/dh-module-type';
import {
  mustBeBoolean,
  mustBeNumber,
  mustBeString,
  mustBeStringAndNotEmpty,
  mustBeObject,
  mustBeArray,
  mustBeArrayAndNotEmpty,
  mustBeStringArrayAndNotEmpty,
  mustBeStringOrStringArrayAndNotEmpty,
  mustBeStringOrBoolean,
  mustBeOneOfEnumValues,
  mustBeObjectOrObjectArrayAndNotEmpty
} from './rule/index';
import {
  ifHasValue,
  whenTypeIs
} from './rule/condition';
import {
  inputTypes,
  dataContainerTypes,
  interactionTypes,
  layoutTypes,
  logicTypes,
  calendarModes
} from './const';

export function checkInteraction({
  component_id,
  type,
  trigger,
  label,
  main = false,
  logic,
  authority_code,
  show_condition = true
} = {}) {
  try {
    type = type.trim();
    mustBeStringAndNotEmpty('type', type);
    ifHasValue(component_id).mustBeStringAndNotEmpty('component_id', component_id);
    mustBeObject('trigger', trigger);
    ifHasValue(trigger.load).mustBeBoolean('trigger.load', trigger.load);
    ifHasValue(trigger.unload).mustBeBoolean('trigger.unload', trigger.unload);
    ifHasValue(trigger.button).mustBeBoolean('trigger.button', trigger.button);
    ifHasValue(trigger.watch).mustBeArray('trigger.watch', trigger.watch);
    if (trigger.button) {
      mustBeStringAndNotEmpty('label', label);
    }
    ifHasValue(main).mustBeBoolean('main', main);
    ifHasValue(logic).mustBeStringAndNotEmpty('logic', logic);
    ifHasValue(authority_code).mustBeString('authority_code', authority_code);
    ifHasValue(show_condition).mustBeStringOrBoolean('show_condition', show_condition);
  } catch (e) {
    throw `交互组件配置错误: ${e}。配置如下：
${JSON.stringify(arguments[0], null, 2)}`;
  }
}
