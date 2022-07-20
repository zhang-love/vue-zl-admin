import { useAppStore } from '@/store/modules/app';
import { useLocaleStoreWithOut } from '@/store/modules/locale';

export function initAppConfigStore() {
  const appStore = useAppStore();
  const localeStore = useLocaleStoreWithOut();
  appStore.updateTheme();
  appStore.updateThemeColor();
  appStore.updateHeaderColor();
  appStore.updateSideColor();
  localeStore.initLocale();
}
