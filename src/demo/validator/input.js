/**
 * catalyst 表单组件配置校验器
 */
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
  calendarModes
} from './const';

export function checkInput({
  component_id,
  type,
  label,
  grid,
  key_name,
  default_value,
  show_condition = true,
  read_only = false,
  clearable = true,
  options_id,
  uri,
  mode,
  edit_content = false
} = {}) {
  try {
    type = type.trim();
    mustBeStringAndNotEmpty('type', type);
    ifHasValue(component_id).mustBeStringAndNotEmpty('component_id', component_id);
    ifHasValue(label).mustBeStringAndNotEmpty('label', label);
    ifHasValue(grid).mustBeNumber('grid', grid);
    whenTypeIs(type, ['text', 'dropdown', 'radio', 'checkbox', 'time', 'switch', 'hidden', 'textarea']).mustBeStringAndNotEmpty('key_name', key_name);
    whenTypeIs(type, ['keyword', 'calendar']).mustBeStringOrStringArrayAndNotEmpty('key_name', key_name);
    if (Array.isArray(key_name)) {
      ifHasValue(default_value).mustBeArrayAndNotEmpty('default_value', default_value);
    }
    ifHasValue(show_condition).mustBeStringOrBoolean('show_condition', show_condition);
    ifHasValue(read_only).mustBeStringOrBoolean('read_only', read_only);
    ifHasValue(clearable).mustBeStringOrBoolean('clearable', clearable);
    whenTypeIs(type, ['dropdown', 'keyword', 'radio', 'checkbox']).mustBeStringAndNotEmpty('options_id', options_id);
    whenTypeIs(type, ['text', 'keyword']).ifHasValue(uri).mustBeString('uri', uri);
    whenTypeIs(type, ['calendar']).mustBeOneOfEnumValues('mode', mode, calendarModes);
    ifHasValue(edit_content).mustBeBoolean('edit_content', edit_content);
  } catch (e) {
    throw `表单组件配置错误: ${e}。配置如下：
${JSON.stringify(arguments[0], null, 2)}`;
  }
}
