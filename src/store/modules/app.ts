import { HeaderSetting, MenuSetting, ProjectConfig } from '#/config';
import { BeforeMiniState } from '#/store';
import { ThemeEnum } from '@/enums/appEnum';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '@/enums/cacheEnum';
import { changeTheme } from '@/logics/theme';
import { updateDarkTheme } from '@/logics/theme/dark';
import { updateHeaderBgColor, updateSidebarBgColor } from '@/logics/theme/updateBackground';
import {
  darkMode,
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
} from '@/settings/designSetting';
import projectSetting from '@/settings/projectSetting';
import { deepMerge, colorToTheme, isLight } from '@/utils';
import { Persistent } from '@/utils/cache/persistent';
import { defineStore } from 'pinia';
import { store } from '..';

interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY) || (projectSetting as ProjectConfig),
    pageLoading: false,
    beforeMiniInfo: {},
  }),
  getters: {
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    getThemeSetting(): ThemeEnum {
      return this.getProjectConfig.theme || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },
    getThemeColor(): string {
      return this.getProjectConfig.themeColor;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting || ({} as HeaderSetting);
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting || ({} as MenuSetting);
    },
    getHeaderTheme(): ThemeEnum {
      return this.getProjectConfig.headerSetting.theme;
    },
    getMenuTheme(): ThemeEnum {
      return this.getProjectConfig.menuSetting.theme;
    },
    getPageLoading(): boolean {
      return this.pageLoading;
    },
  },
  actions: {
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>) {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
    setThemeSetting(darkMode: ThemeEnum) {
      this.darkMode = darkMode;
      localStorage.setItem(APP_DARK_MODE_KEY_, darkMode);
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading;
    },
    updateTheme(targetTheme?: ThemeEnum) {
      let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
      projCfg = deepMerge(projectSetting, projCfg || {});
      const {
        theme,
        headerSetting: { bgColor: headerBgColor, theme: headerTheme },
        menuSetting: { bgColor: siderBgColor, theme: menuTheme },
      } = projCfg;
      targetTheme = targetTheme || theme;
      this.setProjectConfig({ theme: targetTheme });
      updateDarkTheme(targetTheme);
      if (!isLight(targetTheme)) {
        isLight(headerTheme) && updateHeaderBgColor(HEADER_PRESET_BG_COLOR_LIST[1]);
        isLight(menuTheme) && updateSidebarBgColor(SIDE_BAR_BG_COLOR_LIST[1]);
      } else {
        updateHeaderBgColor(headerBgColor);
        updateSidebarBgColor(siderBgColor);
      }
    },
    updateThemeColor(targetThemeColor?: string) {
      if (!this.projectConfig) return;
      targetThemeColor = targetThemeColor || this.projectConfig.themeColor;
      changeTheme(targetThemeColor);
    },
    updateHeaderColor(color?: string) {
      if (!this.projectConfig) return;
      color = color || this.projectConfig.headerSetting.bgColor;
      updateHeaderBgColor(color);
    },
    updateSideColor(color?: string) {
      if (!this.projectConfig) return;
      color = color || this.projectConfig.menuSetting.bgColor;
      updateSidebarBgColor(color);
    },
  },
});

export const useAppStoreWithOut = () => {
  return useAppStore(store);
};
