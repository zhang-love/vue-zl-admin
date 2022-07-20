import { useAppStore } from '@/store/modules/app';
import { ThemeEnum } from '@/enums/appEnum';
import { setCssVar } from './util';
import { generateAntColors } from 'build/config/themeConfig';
import { unref } from 'vue';
import { colorToTheme, isLight } from '@/utils';

const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_LIGHTEN_BG_COLOR = '--header-light-bg-color';

const SIDER_BG_COLOR = '--sider-bg-color';
const SIDER_LIGHTEN_BG_COLOR = '--sider-lighten-bg-color';

/**
 * Change the background color of the top header
 * @param color
 */
export function updateHeaderBgColor(color: string) {
  const appStore = useAppStore();
  if (isLight(colorToTheme(color)) && appStore.getThemeSetting === ThemeEnum.DARK) return;

  appStore.setProjectConfig({ headerSetting: { bgColor: color, theme: colorToTheme(color) } });

  const isDark = appStore.getHeaderTheme === ThemeEnum.DARK;
  const colors = generateAntColors(color || '', appStore.getHeaderTheme);

  // bg color
  setCssVar(HEADER_BG_COLOR_VAR, color);
  setCssVar(HEADER_LIGHTEN_BG_COLOR, unref(isDark) ? colors[6] : '#f5f5f5');
}

/**
 * Change the background color of the left menu
 * @param color  bg color
 */
export function updateSidebarBgColor(color: string) {
  const appStore = useAppStore();
  if (isLight(colorToTheme(color)) && appStore.getThemeSetting === ThemeEnum.DARK) return;
  appStore.setProjectConfig({ menuSetting: { bgColor: color, theme: colorToTheme(color) } });

  const isDark = appStore.getMenuTheme === ThemeEnum.DARK;
  const colors = generateAntColors(color || '', appStore.getMenuTheme);
  setCssVar(SIDER_BG_COLOR, color);
  setCssVar(SIDER_LIGHTEN_BG_COLOR, unref(isDark) ? colors[6] : colors[5]);
}
