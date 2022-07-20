import { ProjectConfig } from '#/config';
import { ThemeEnum } from '@/enums/appEnum';
import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';

export function useRootSetting() {
  const appStore = useAppStore();
  const getThemeColor = computed(() => appStore.getProjectConfig.themeColor);

  function setRootSetting(setting: Partial<ProjectConfig>) {
    appStore.setProjectConfig(setting);
  }
  function setThemeSetting(theme: ThemeEnum) {
    setRootSetting({ theme });
  }
  const getThemeSetting = computed(() => appStore.getProjectConfig.theme);
  return {
    setThemeSetting,
    setRootSetting,
    getThemeSetting,
    getThemeColor,
    getShowDarkModeToggle: computed(() => appStore.getProjectConfig.showDarkModeToggle),
    getShowLogo: computed(() => appStore.getProjectConfig.showLogo),
  };
}
