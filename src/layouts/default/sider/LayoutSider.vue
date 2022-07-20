<!--
 * @Author: ZLun
 * @Description: sider
-->
<template>
  <!-- <a-drawer v-if="getIsMobile" v-model:visible="visible"> xx </a-drawer> -->
  <a-layout-sider
    :class="getSiderClass"
    :width="getMenuWidth"
    :collapsedWidth="getCollapsedWidth"
    breakpoint="lg"
    :collapsed="getCollapsed"
    :theme="getMenuTheme"
    mode="inline"
    @collapse="toggleCollapsed"
  >
    <LayoutMenu />
  </a-layout-sider>
</template>

<script lang="ts" setup>
  import LayoutMenu from './LayoutMenu.vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { computed, unref, watchEffect } from 'vue';
  import { useMenuSetting } from '@/settings/useMenuSetting';

  const { prefixCls } = useDesign('layout-sider');

  const { toggleCollapsed, getMenuWidth, getCollapsedWidth, getMenuTheme, getCollapsed } =
    useMenuSetting();

  const getSiderClass = computed(() => {
    return [
      prefixCls,
      // `${prefixCls}-${unref(getMenuTheme)}`,
      {
        [`${prefixCls}-collapsed`]: getCollapsed,
      },
    ];
  });
</script>
<style lang="less">
  @import './sider.less';
</style>
