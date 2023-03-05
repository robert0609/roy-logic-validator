import typer from '@xes/dh-module-type';
import { checkLayout } from './layout';
import { checkInput } from './input';
import { checkContainer } from './container';
import { checkInteraction } from './interaction';
import { checkLogic } from './logic';
import {
  isInput,
  isDataContainer,
  isInteraction,
  isLayout,
  isLogic
} from './judge.js';


function check({
  layout = [],
  content = []
} = {}) {
  const componentIdsInLayout = [];
  // 校验布局区
  traverseLayout(layout);
  // 校验内容区
  traverseContent(content);

  function traverseLayout(layoutConfig = []) {
    layoutConfig.forEach(child => {
      let typeOfChild = typer.getType(child);
      if (typeOfChild === typer.EnumType.bString) {
        componentIdsInLayout.push(child);
      } else if (typeOfChild === typer.EnumType.bObject && isLayout(child)) {
        checkLayout(child);
        if (child.children) {
          traverseLayout(child.children);
        }
      } else {
        throw `布局区配置了不合法的组件。布局区只能配置组件实例ID或者嵌套另外的布局组件。配置如下：
${JSON.stringify(child, null, 2)}`;
      }
    });
  }

  /**
   * @param {boolean} needValidateIfInLayout 是否校验"组件配置到了布局区"，因为有些组件是不能配置到布局区的
   */
  function traverseContent(childConfigs = [], parentConfig = null, needValidateIfInLayout = false) {
    childConfigs.forEach(child => {
      let typeOfChild = typer.getType(child);
      if (typeOfChild === typer.EnumType.bObject) {
        if (isInput(child)) {
          checkInput(child);
          if (needValidateIfInLayout && child.component_id && componentIdsInLayout.includes(child.component_id)) {
            throw `表单组件[${child.component_id}]处于循环数据实体内部，不能配置到布局区`;
          }
        } else if (isDataContainer(child)) {
          checkContainer(child);
          if (needValidateIfInLayout && child.component_id && componentIdsInLayout.includes(child.component_id)) {
            throw `数据容器组件[${child.component_id}]处于循环数据实体内部，不能配置到布局区`;
          }
          if (child.type === 'block') {
            if (typer.getType(child.children) === typer.EnumType.bObject) {
              if (child.children.type === 'block') {
                traverseContent([child.children], child, true);
              } else {
                throw 'block组件的children配置错误：如果children是对象类型，那么只能配置成另一个block组件';
              }
            } else {
              traverseContent(child.children, child, needValidateIfInLayout);
            }
          }
        } else if (isInteraction(child)) {
          checkInteraction(child);
          if (needValidateIfInLayout && child.component_id && componentIdsInLayout.includes(child.component_id)) {
            throw `交互组件[${child.component_id}]处于循环数据实体内部，不能配置到布局区`;
          }
        } else if (isLogic(child)) {
          if (parentConfig) {
            throw `逻辑组件[${child.component_id}]禁止嵌套在其它组件内部`;
          }
          checkLogic(child);
          // 逻辑组件不需要手动配置到布局区
          if (child.component_id && componentIdsInLayout.includes(child.component_id)) {
            throw `逻辑组件[${child.component_id}]不需要手动配置到布局区`;
          }
        } else {
          throw `内容区配置了不合法的组件。内容区只能配置表单组件、数据容器组件、交互组件和逻辑组件。配置如下：
${JSON.stringify(child, null, 2)}`;
        }
      }
    });
  }
}

export default {
  check
};
