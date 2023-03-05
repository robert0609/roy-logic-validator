import { inputTypes, dataContainerTypes, interactionTypes, layoutTypes, logicTypes } from './const';

function valid(t) {
  if (!t) {
    throw new Error('判断配置组件类型失败，传入的配置对象为空');
  }
}

export function isInput(t) {
  valid(t);
  t = t.type;
  return inputTypes.includes(t);
}

export function isDataContainer(t) {
  valid(t);
  t = t.type;
  return dataContainerTypes.includes(t);
}

export function isInteraction(t) {
  valid(t);
  t = t.type;
  return interactionTypes.includes(t);
}

export function isLayout(t) {
  valid(t);
  t = t.type;
  return layoutTypes.includes(t);
}

export function isLogic(t) {
  valid(t);
  let ty = t.type;
  return logicTypes.includes(ty);
}

export function isCatalystComponent(t) {
  valid(t);
  let ty = t.type;
  let currentTypes = [].concat(inputTypes, dataContainerTypes, interactionTypes, layoutTypes, logicTypes);
  return currentTypes.includes(ty);
}