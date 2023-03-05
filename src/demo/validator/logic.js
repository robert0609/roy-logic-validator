/**
 * catalyst 逻辑组件配置校验器
 */
import typer from '@xes/dh-module-type';
import {
  mustBeBoolean,
  mustBeNumber,
  mustBeString,
  mustBeStringAndNotEmpty,
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
  calendarModes,
  ajaxMethods
} from './const';

export function checkLogic({
  component_id,
  type,
  uri,
  method,
  target,
  script,
  next
} = {}) {
  try {
    type = type.trim();
    mustBeStringAndNotEmpty('type', type);
    ifHasValue(component_id).mustBeStringAndNotEmpty('component_id', component_id);
    whenTypeIs(type, ['page', 'ajax', 'dialog', 'docker']).mustBeStringAndNotEmpty('uri', uri);
    whenTypeIs(type, ['ajax']).ifHasValue(method).mustBeOneOfEnumValues('method', method, ajaxMethods);
    if (type === 'ajax' && target) {
      let typeOfTarget = typer.getType(target);
      if (typeOfTarget === typer.EnumType.bString) {
        mustBeStringAndNotEmpty('target', target);
      } else if (typeOfTarget === typer.EnumType.bArray) {
        mustBeStringArrayAndNotEmpty('target', target);
      } else if (typeOfTarget === typer.EnumType.bObject) {
        Object.keys(target).forEach(k => {
          mustBeStringAndNotEmpty(`target[${k}]`, target[k]);
        });
      } else {
        throw '对于ajax类型，target必须是字符串、数组或者对象这三种类型之一';
      }
    }
    whenTypeIs(type, ['js']).mustBeStringAndNotEmpty('script', script);
    ifHasValue(next).mustBeString('next', next);
  } catch (e) {
    throw `逻辑组件配置错误: ${e}。配置如下：
${JSON.stringify(arguments[0], null, 2)}`;
  }
}
