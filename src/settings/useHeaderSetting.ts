import { HeaderSetting } from '#/config';
import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';

export function useHeaderSetting() {
  const appStore = useAppStore();

  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setProjectConfig({ headerSetting });
  }
  const getShowHeader = computed(() => appStore.getHeaderSetting.show);
  const getHeaderBgColor = computed(() => appStore.getHeaderSetting.bgColor);

  const getHeaderTheme = computed(() => appStore.getHeaderTheme);
  return {
    setHeaderSetting,
    getHeaderTheme,
    getShowHeader,
    getHeaderBgColor,
  };
}
