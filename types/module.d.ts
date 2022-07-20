declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

declare module 'ant-design-vue/es/locale/*' {
  import { Locale } from 'ant-design-vue/types/locale-provider';
  const locale: Locale & ReadonlyRecordable;
  export default locale as Locale & ReadonlyRecordable;
}
declare module 'ant-design-vue/dist/theme' {
  export { getThemeVariables } from 'ant-design-vue/dist/theme';
}
// declare module 'ant-design-vue/dist/*' {
//   import { getThemeVariables } from 'ant-design-vue/dist/theme';
//   export { getThemeVariables };
// }

declare module 'virtual:*' {
  const result: any;
  export default result;
}
