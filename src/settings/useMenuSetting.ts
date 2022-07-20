import { MenuSetting } from '#/config';
import { SIDE_BAR_MINI_WIDTH } from '@/enums/appEnum';
import { MenuModeEnum } from '@/enums/menuEnum';
import { useAppStore } from '@/store/modules/app';
import { computed, unref } from 'vue';

export function useMenuSetting() {
  const appStore = useAppStore();

  function setMenuSetting(menuSetting: Partial<MenuSetting>) {
    appStore.setProjectConfig({ menuSetting: menuSetting });
  }
  const getMenuType = computed(() => appStore.getMenuSetting.type);

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
  const getMenuMode = computed(() => appStore.getMenuSetting.mode);
  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor);
  const getIsHorizontal = computed(() => unref(getMenuMode) === MenuModeEnum.HORIZONTAL);
  const getMenuWidth = computed(() =>
    unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : appStore.getMenuSetting.menuWidth,
  );

  const isLight = computed(() => ['#fff', '#ffffff'].includes(unref(getMenuBgColor).toLowerCase()));

  const getMenuTheme = computed(() => appStore.getMenuTheme);

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    isLight,
    toggleCollapsed,
    setMenuSetting,
    getCollapsed,
    getMenuTheme,
    getMenuWidth,
    getMenuMode,
    getMenuBgColor,
    getMenuType,
    getIsHorizontal,
    getShowMenu: computed(() => appStore.getMenuSetting.show),
    getCollapsedWidth: computed(() => appStore.getMenuSetting.collapsedWidth),
    getAccordion: computed(() => appStore.getMenuSetting.accordion),
    getCollapsedShowTitle: computed(() => appStore.getMenuSetting.collapsedShowTitle),
    getSplitType: computed(() => appStore.getMenuSetting.splitType),
  };
}
