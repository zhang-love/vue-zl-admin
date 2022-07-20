<!--
 * @Author: ZLun
 * @Description: layout
-->
<template>
  <a-layout :class="prefixCls">
    <!-- <a-layout-header>header</a-layout-header> -->
    <a-layout>
      <LayoutSider v-if="getShowMenu" />
      <a-layout>
        <LayoutHeader v-if="getShowHeader" />
        <LayoutTabs />
        <a-layout-content class="overflow-auto">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import LayoutSider from './sider/LayoutSider.vue';
  import LayoutHeader from './header/LayoutHeader.vue';
  import LayoutTabs from './tabs/LayoutTabs.vue';
  import { useMenuSetting } from '@/settings/useMenuSetting';
  import { useHeaderSetting } from '@/settings/useHeaderSetting';

  const { prefixCls } = useDesign('default-layout');

  const { getShowMenu } = useMenuSetting();
  const { getShowHeader } = useHeaderSetting();

  // async function useStyle() {
  //   const res = await import('ant-design-vue/dist/antd.dark.less');
  //   console.log('res', res);
  // }
  // useStyle();
</script>
<style lang="less">
  @import './index.less';
</style>
