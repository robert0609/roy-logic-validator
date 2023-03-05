/**
 * catalyst 数据容器组件配置校验器
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
  calendarModes
} from './const';

function checkColumn({
  label,
  tips,
  children,
  disable_overflow_tooltip,
  field,
  fields
} = {}) {
  try {
    mustBeStringAndNotEmpty('label', label);
    ifHasValue(tips).mustBeStringAndNotEmpty('tips', tips);
    ifHasValue(children).mustBeArray('children', children);
    ifHasValue(disable_overflow_tooltip).mustBeBoolean('disable_overflow_tooltip', disable_overflow_tooltip);
    if (typer.isNullOrUndefined(field) && typer.isNullOrUndefined(fields)) {
      throw 'field与fields必须至少存在一个';
    }
    ifHasValue(fields).mustBeArray('fields', fields);
  } catch (e) {
    throw `表格列头配置错误: ${e}。配置如下：
${JSON.stringify(arguments[0], null, 2)}`;
  }
  if (!typer.isNullOrUndefined(field)) {
    checkField(field);
  } else {
    fields.forEach(field => {
      checkField(field);
    });
  }
}

function checkField({
  type,
  key_name,
  sortable = false,
  options_id,
  format,
  text,
  label,
  logic,
  authority_code,
  show_condition = true
} = {}) {
  try {
    type = type.trim();
    mustBeStringAndNotEmpty('type', type);
    whenTypeIs(type, ['raw', 'enum_text', 'enum_icon', 'timespan', 'datetime', 'money', 'thumbnail', 'audio']).mustBeStringAndNotEmpty('key_name', key_name);
    whenTypeIs(type, ['interaction']).ifHasValue(key_name).mustBeStringAndNotEmpty('key_name', key_name);
    ifHasValue(sortable).mustBeBoolean('sortable', sortable);
    whenTypeIs(type, ['enum_text', 'enum_icon']).mustBeStringAndNotEmpty('options_id', options_id);
    whenTypeIs(type, ['timespan', 'datetime']).ifHasValue(format).mustBeStringAndNotEmpty('format', format);
    whenTypeIs(type, ['divider']).mustBeStringAndNotEmpty('text', text);
    whenTypeIs(type, ['interaction']).ifHasValue(label).mustBeStringAndNotEmpty('label', label);
    if (type === 'interaction' && !key_name && !label) {
      throw `对于${type}类型，key_name和label需要至少配置一项`;
    }
    whenTypeIs(type, ['interaction']).ifHasValue(logic).mustBeStringAndNotEmpty('logic', logic);
    whenTypeIs(type, ['interaction']).ifHasValue(authority_code).mustBeString('authority_code', authority_code);
    whenTypeIs(type, ['interaction']).ifHasValue(show_condition).mustBeStringOrBoolean('show_condition', show_condition);
  } catch (e) {
    throw `表格数据字段组件配置错误: ${e}。配置如下：
${JSON.stringify(arguments[0], null, 2)}`;
  }
}

export function checkContainer({
  component_id,
  type,
  key_name,
  show_condition = true,
  children,
  columns,
  page_index,
  page_size,
  total_count,
  order_by,
  order,
  selection
} = {}) {
  try {
    type = type.trim();
    mustBeStringAndNotEmpty('type', type);
    ifHasValue(component_id).mustBeStringAndNotEmpty('component_id', component_id);
    mustBeStringAndNotEmpty('key_name', key_name);
    ifHasValue(show_condition).mustBeStringOrBoolean('show_condition', show_condition);
    whenTypeIs(type, ['block']).mustBeObjectOrObjectArrayAndNotEmpty('children', children);
    whenTypeIs(type, ['table']).mustBeArrayAndNotEmpty('columns', columns);
    whenTypeIs(type, ['table']).mustBeString('page_index', page_index);
    whenTypeIs(type, ['table']).mustBeString('page_size', page_size);
    whenTypeIs(type, ['table']).mustBeString('total_count', total_count);
    whenTypeIs(type, ['table']).ifHasValue(order_by).mustBeString('order_by', order_by);
    whenTypeIs(type, ['table']).ifHasValue(order).mustBeString('order', order);
    whenTypeIs(type, ['table']).ifHasValue(selection).mustBeString('selection', selection);
  } catch (e) {
    throw `数据容器组件配置错误: ${e}。配置如下：
${JSON.stringify(arguments[0], null, 2)}`;
  }
  if (type === 'table') {
    columns.forEach(column => {
      checkColumn(column);
    });
  }
}
