/**
 * catalyst 布局组件配置校验器
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
  calendarModes,
  ajaxMethods,
  layoutModes,
  layoutFoldModes,
  layoutJustify,
  layoutAlign
} from './const';

export function checkLayout({
  type,
  style_object,
  children,
  tag,
  foldable = false,
  fold_mode,
  label,
  gutter,
  mode,
  justify,
  align,
  grid,
  offset,
  push,
  pull,
  xs,
  sm,
  md,
  lg,
  xl
} = {}) {
  try {
    type = type.trim();
    mustBeStringAndNotEmpty('type', type);
    ifHasValue(style_object).mustBeObject('style_object', style_object);
    ifHasValue(children).mustBeArray('children', children);
    ifHasValue(tag).mustBeStringAndNotEmpty('tag', tag);
    whenTypeIs(type, ['row']).ifHasValue(foldable).mustBeBoolean('foldable', foldable);
    whenTypeIs(type, ['row']).ifHasValue(fold_mode).mustBeOneOfEnumValues('fold_mode', fold_mode, layoutFoldModes);
    whenTypeIs(type, ['row']).ifHasValue(label).mustBeStringAndNotEmpty('label', label);
    whenTypeIs(type, ['row']).ifHasValue(gutter).mustBeNumber('gutter', gutter);
    whenTypeIs(type, ['row']).ifHasValue(mode).mustBeOneOfEnumValues('mode', mode, layoutModes);
    whenTypeIs(type, ['row']).ifHasValue(justify).mustBeOneOfEnumValues('justify', justify, layoutJustify);
    whenTypeIs(type, ['row']).ifHasValue(align).mustBeOneOfEnumValues('align', align, layoutAlign);
    whenTypeIs(type, ['col']).ifHasValue(grid).mustBeNumber('grid', grid);
    whenTypeIs(type, ['col']).ifHasValue(offset).mustBeNumber('offset', offset);
    whenTypeIs(type, ['col']).ifHasValue(push).mustBeNumber('push', push);
    whenTypeIs(type, ['col']).ifHasValue(pull).mustBeNumber('pull', pull);
  } catch (e) {
    throw `布局组件配置错误: ${e}。配置如下：
${JSON.stringify(arguments[0], null, 2)}`;
  }
}
