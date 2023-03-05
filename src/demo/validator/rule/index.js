import typer from '@xes/dh-module-type';

export function mustBeBoolean(key, value) {
  if (typer.getType(value) !== typer.EnumType.bBoolean) {
    throw `${key}必须是布尔值`;
  }
}

export function mustBeNumber(key, value) {
  if (typer.getType(value) !== typer.EnumType.bNumber) {
    throw `${key}必须是数值`;
  }
}

export function mustBeString(key, value) {
  if (typer.getType(value) !== typer.EnumType.bString) {
    throw `${key}必须是字符串`;
  }
}

export function mustBeStringAndNotEmpty(key, value) {
  mustBeString(key, value);
  if (typer.isStringEmpty(value)) {
    throw `${key}不能为空字符串`;
  }
}

export function mustBeObject(key, value) {
  if (typer.getType(value) !== typer.EnumType.bObject) {
    throw `${key}必须是对象`;
  }
}

export function mustBeArray(key, value) {
  if (typer.getType(value) !== typer.EnumType.bArray) {
    throw `${key}必须是数组`;
  }
}

export function mustBeArrayAndNotEmpty(key, value) {
  mustBeArray(key, value);
  if (value.length === 0) {
    throw `${key}不能为空数组`;
  }
}

export function mustBeStringArrayAndNotEmpty(key, value) {
  mustBeArrayAndNotEmpty(key, value);
  value.forEach((v, i) => {
    mustBeStringAndNotEmpty(`${key}[${i}]`, v);
  });
}

export function mustBeStringOrStringArrayAndNotEmpty(key, value) {
  const typeOfValue = typer.getType(value);
  switch(typeOfValue) {
  case typer.EnumType.bString:
    if (typer.isStringEmpty(value.trim())) {
      throw `${key}不能为空`;
    }
    break;
  case typer.EnumType.bArray:
    mustBeStringArrayAndNotEmpty(key, value);
    break;
  default:
    throw `${key}必须是字符串或者字符串数组`;
  }
}

export function mustBeObjectOrObjectArrayAndNotEmpty(key, value) {
  const typeOfValue = typer.getType(value);
  if (typeOfValue === typer.EnumType.bObject || typeOfValue === typer.EnumType.bArray) {
    if (typeOfValue === typer.EnumType.bArray) {
      mustBeArrayAndNotEmpty(key, value);
    }
  } else {
    throw `${key}必须是对象或者对象数组`;
  }
}

export function mustBeStringOrBoolean(key, value) {
  const typeOfValue = typer.getType(value);
  switch(typeOfValue) {
  case typer.EnumType.bBoolean:
  case typer.EnumType.bString:
    break;
  default:
    throw `${key}必须是布尔值或者字符串`;
  }
}

export function mustBeOneOfEnumValues(key, value, enumValues) {
  if (!enumValues.includes(value)) {
    throw `${key}必须是${enumValues.toString()}其中一个`;
  }
}
