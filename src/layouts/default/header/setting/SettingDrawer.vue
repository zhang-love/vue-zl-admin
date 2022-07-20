<!--
 * @Author: ZLun
 * @Description: setting-drawer
-->
<template>
  <span @click="showDrawer">
    <Icon icon="ion:settings-outline" />
    <a-drawer v-model:visible="visible" :title="t('layout.setting.drawerTitle')" :width="330">
      <a-divider>{{ t('layout.setting.darkMode') }}</a-divider>
      <AppDarkModeToggle class="mx-auto" />
      <a-divider>{{ t('layout.setting.navMode') }}</a-divider>
      <TypePicker :menuTypeList="menuTypeList" :handler="menuHandler" :def="getMenuType" />
      <a-divider>{{ t('layout.setting.sysTheme') }}</a-divider>
      <ThemeColorPicker
        :colorList="APP_PRESET_COLOR_LIST"
        :def="getThemeColor"
        :change="changeColor(HandlerEnum.MAIN_COLOR)"
      />
      <a-divider>{{ t('layout.setting.headerTheme') }}</a-divider>
      <ThemeColorPicker
        :colorList="HEADER_PRESET_BG_COLOR_LIST"
        :def="getHeaderBgColor"
        :change="changeColor(HandlerEnum.HEADER_THEME)"
      />
      <a-divider>{{ t('layout.setting.sidebarTheme') }}</a-divider>
      <ThemeColorPicker
        :colorList="SIDE_BAR_BG_COLOR_LIST"
        :def="getMenuBgColor"
        :change="changeColor(HandlerEnum.MENU_THEME)"
      />
    </a-drawer>
  </span>
</template>

<script lang="ts" setup>
  import { ref, unref, watch, watchEffect } from 'vue';
  import Icon from '@/components/icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import AppDarkModeToggle from '@/components/application/AppDarkModeToggle.vue';
  import { HandlerEnum, menuTypeList } from './enum';
  import TypePicker from './components/TypePicker.vue';
  import { useMenuSetting } from '@/settings/useMenuSetting';
  import {
    HEADER_PRESET_BG_COLOR_LIST,
    APP_PRESET_COLOR_LIST,
    SIDE_BAR_BG_COLOR_LIST,
  } from '@/settings/designSetting';
  import { useHeaderSetting } from '@/settings/useHeaderSetting';
  import ThemeColorPicker from './components/ThemeColorPicker.vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { changeTheme } from '@/logics/theme';
  import { updateHeaderBgColor, updateSidebarBgColor } from '@/logics/theme/updateBackground';
  import { useAppStore } from '@/store/modules/app';
  const visible = ref();
  const { t } = useI18n();

  const { getThemeColor, setRootSetting } = useRootSetting();
  const { getMenuType, setMenuSetting, getMenuBgColor } = useMenuSetting();
  const { getHeaderBgColor, setHeaderSetting } = useHeaderSetting();
  const appStore = useAppStore();

  const showDrawer = () => {
    visible.value = true;
  };

  function changeColor(type: HandlerEnum) {
    return function (color: string) {
      switch (type) {
        case HandlerEnum.MAIN_COLOR: {
          appStore.updateThemeColor(color);
          break;
        }
        case HandlerEnum.HEADER_THEME: {
          appStore.updateHeaderColor(color);
          break;
        }
        case HandlerEnum.MENU_THEME: {
          appStore.updateSideColor(color);
        }
      }
    };
  }
  function menuHandler(item: typeof menuTypeList[0]) {
    const { mode, type } = item;
    setMenuSetting({
      mode,
      type,
    });
  }
</script>
<style lang="less"></style>
