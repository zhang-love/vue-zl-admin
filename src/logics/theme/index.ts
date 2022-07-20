import { useAppStore } from '@/store/modules/app';
import { ConfigProvider } from 'ant-design-vue';
import { getThemeColors, generateAntColors } from 'build/config/themeConfig';

import { replaceStyleVariables } from 'vite-plugin-theme/es/client';
import { setCssVar } from './util';

// const THEME_COLOR = '--ant-primary-color';
// const LIGHT_THEME_COLOR = '--theme-color-active';

export async function changeTheme(color: string) {
  const appStore = useAppStore();
  const colors = generateAntColors(color, appStore.getThemeSetting);
  appStore.setProjectConfig({ themeColor: color });

  const theme = appStore.getThemeSetting;
  // setCssVar(THEME_COLOR, colors[5]);
  // setCssVar(LIGHT_THEME_COLOR, colors[0]);
  console.log('color', color, theme);
  ConfigProvider.config({
    theme: {
      primaryColor: color,
    },
  });
  // ConfigProvider.config({
  //   theme: {
  //     primaryColor: color,
  //   },
  // });
  // return await replaceStyleVariables({
  //   colorVariables: generateAntColors(color, theme),
  // });
}
