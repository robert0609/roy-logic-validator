import {
  getType,
  VariableType,
  isStringEmpty,
  isBoolean,
  isNumber,
  isString,
  isArray
} from 'roy-type-assert';

export function mustBeBoolean(key: string, value: any) {
  if (!isBoolean(value)) {
    throw `${key}必须是布尔值`;
  }
}

export function mustBeNumber(key: string, value: any) {
  if (!isNumber(value)) {
    throw `${key}必须是数值`;
  }
}

export function mustBeString(key: string, value: any) {
  if (!isString(value)) {
    throw `${key}必须是字符串`;
  }
}

export function mustBeStringAndNotEmpty(key: string, value: any) {
  mustBeString(key, value);
  if (isStringEmpty(value)) {
    throw `${key}不能为空字符串`;
  }
}

export function mustBeObject(key: string, value: any) {
  if (getType(value) !== VariableType.bObject) {
    throw `${key}必须是对象`;
  }
}

export function mustBeArray(key: string, value: any) {
  if (!isArray(value)) {
    throw `${key}必须是数组`;
  }
}

export function mustBeArrayAndNotEmpty(key: string, value: any) {
  mustBeArray(key, value);
  if (value.length === 0) {
    throw `${key}不能为空数组`;
  }
}

export function mustBeStringArrayAndNotEmpty(key: string, value: any) {
  mustBeArrayAndNotEmpty(key, value);
  value.forEach((v: any, i: number) => {
    mustBeStringAndNotEmpty(`${key}[${i}]`, v);
  });
}

export function mustBeStringOrStringArrayAndNotEmpty(key: string, value: any) {
  const typeOfValue = getType(value);
  switch (typeOfValue) {
    case VariableType.bString:
      if (isStringEmpty(value.trim())) {
        throw `${key}不能为空`;
      }
      break;
    case VariableType.bArray:
      mustBeStringArrayAndNotEmpty(key, value);
      break;
    default:
      throw `${key}必须是字符串或者字符串数组`;
  }
}

export function mustBeObjectOrObjectArrayAndNotEmpty(key: string, value: any) {
  const typeOfValue = getType(value);
  if (
    typeOfValue === VariableType.bObject ||
    typeOfValue === VariableType.bArray
  ) {
    if (typeOfValue === VariableType.bArray) {
      mustBeArrayAndNotEmpty(key, value);
    }
  } else {
    throw `${key}必须是对象或者对象数组`;
  }
}

export function mustBeStringOrBoolean(key: string, value: any) {
  const typeOfValue = getType(value);
  switch (typeOfValue) {
    case VariableType.bBoolean:
    case VariableType.bString:
      break;
    default:
      throw `${key}必须是布尔值或者字符串`;
  }
}

export function mustBeOneOfEnumValues(
  key: string,
  value: any,
  enumValues: any[]
) {
  if (!enumValues.includes(value)) {
    throw `${key}必须是${enumValues.toString()}其中一个`;
  }
}

interface IRules {
  mustBeBoolean(key: string, value: any): void;
  mustBeNumber(key: string, value: any): void;
  mustBeString(key: string, value: any): void;
  mustBeStringAndNotEmpty(key: string, value: any): void;
  mustBeObject(key: string, value: any): void;
  mustBeArray(key: string, value: any): void;
  mustBeArrayAndNotEmpty(key: string, value: any): void;
  mustBeStringArrayAndNotEmpty(key: string, value: any): void;
  mustBeStringOrStringArrayAndNotEmpty(key: string, value: any): void;
  mustBeObjectOrObjectArrayAndNotEmpty(key: string, value: any): void;
  mustBeStringOrBoolean(key: string, value: any): void;
  mustBeOneOfEnumValues(key: string, value: any, enumValues: any[]): void;
}

const rules: IRules = {
  mustBeBoolean,
  mustBeNumber,
  mustBeString,
  mustBeStringAndNotEmpty,
  mustBeObject,
  mustBeArray,
  mustBeArrayAndNotEmpty,
  mustBeStringArrayAndNotEmpty,
  mustBeStringOrStringArrayAndNotEmpty,
  mustBeObjectOrObjectArrayAndNotEmpty,
  mustBeStringOrBoolean,
  mustBeOneOfEnumValues
};

export type { IRules };
export default rules;
