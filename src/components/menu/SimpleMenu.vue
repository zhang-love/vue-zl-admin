<!--
 * @Author: ZLun
 * @Description: menu
-->
<template>
  <span :key="state.refreshKey">
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :theme="theme"
      :inlineIndent="16"
      @click="handleMenuClick"
    >
      <SimpleSubMenu v-for="item in items" :key="item.path" :item="item" :parent="true" />
    </a-menu>
  </span>
</template>

<script lang="ts" setup>
  import { onMounted, PropType, reactive, Ref, ref, unref, watch } from 'vue';
  import { RouteLocationNormalized, useRouter } from 'vue-router';
  import type { Menu as MenuType } from '@/router/types';
  import { useDesign } from '@/hooks/web/useDesign';
  import SimpleSubMenu from './SimpleSubMenu.vue';
  import { useMenuSetting } from '@/settings/useMenuSetting';
  import { useGo } from '@/hooks/web/usePage';
  import { listenerRouteChange } from '@/logics/mitt/routeChange';
  import { REDIRECT_NAME } from '@/router/constants';
  import { ThemeEnum } from '@/enums/appEnum';

  const props = defineProps({
    items: {
      type: Array as PropType<MenuType[]>,
      default: () => [],
    },
    theme: {
      type: String as PropType<ThemeEnum>,
      default: ThemeEnum.LIGHT,
    },
  });

  const state = reactive({
    refreshKey: 1,
    openKeys: [] as string[],
    selectedKeys: [] as string[],
  });

  const { currentRoute } = useRouter();
  const { getCollapsed } = useMenuSetting();
  const go = useGo();

  watch(
    () => currentRoute.value,
    (route) => {
      if (route?.name === REDIRECT_NAME) return;
      const currentPath = unref(currentRoute).path;
      state.selectedKeys = [currentPath];
      const parentPath = currentPath.split('/');
      parentPath.pop();
      if (!unref(getCollapsed)) {
        state.openKeys = [];
        state.openKeys.push(...parentPath.filter((item) => !!item).map((item) => `/${item}`));
      }
      state.refreshKey++;
    },
    { immediate: true },
  );

  function handleMenuClick({ key }: any) {
    go(key);
  }
</script>
<style lang="less">
  // @import './index.less';
</style>
