import { LocaleSetting, LocaleType } from '#/config';
import { LOCALE_KEY } from '@/enums/cacheEnum';
import { localeSetting } from '@/settings/localeSetting';
import { createLocalStorage } from '@/utils/cache';
import { defineStore } from 'pinia';
import { store } from '..';

interface localState {
  localInfo: LocaleSetting;
}

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): localState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'zh_CN';
    },
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      ls.set(LOCALE_KEY, this.localInfo);
    },
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
