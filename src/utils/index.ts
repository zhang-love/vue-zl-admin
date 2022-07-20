import { ThemeEnum } from '@/enums/appEnum';
import { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import { isObject } from './is';

export const noop = () => {};

export function colorToTheme(color: string) {
  return ['#ffffff'].includes(color) ? ThemeEnum.LIGHT : ThemeEnum.DARK;
}
export function isLight(theme: string) {
  return theme !== ThemeEnum.DARK;
}
export function sortArr(a: any, b: any, key: string, type: string) {
  return type === 'ascend' ? a[key] - b[key] : b[key] - a[key];
}
export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

export function upperFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function hasProperty(item: Object, key: string) {
  return item.hasOwnProperty(key);
}
export function deepMerge(src: any = {}, target: any = {}) {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}
