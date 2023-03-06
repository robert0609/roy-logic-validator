import { ifHasValue, whenFieldFulfills } from '../index';

const obj = {
  a: 10,
  b: true
}

ifHasValue(obj.a).mustBeNumber('b', obj.b);
