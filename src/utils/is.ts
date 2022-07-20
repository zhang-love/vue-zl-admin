export function isObject(val: any) {
  return val !== null && is(val, 'Object');
}

export function is(val: any, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}
export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}
export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}
export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}
export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}
