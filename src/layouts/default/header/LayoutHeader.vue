<!--
 * @Author: ZLun
 * @Description: header
-->
<template>
  <a-layout-header :class="getHeaderClass">
    <!-- <AppLogo
      v-if="getShowHeaderLogo || getIsMobile"
      :class="`${prefixCls}-logo`"
      :theme="getHeaderTheme"
      :style="getLogoWidth"
    /> -->
    <div :class="`${prefixCls}-left`">
      <LayoutTrigger />
      <LayoutBreadcrumb />
    </div>
    <div :class="`${prefixCls}-action`">
      <AppSearch :class="['px-1', `${prefixCls}-action__item`]" />
      <Notify :class="`${prefixCls}-action__item`" />
      <FullScreen :class="`${prefixCls}-action__item`" />
      <AppLocalePicker :class="`${prefixCls}-action__item`" />
      <UserDropdown :class="`${prefixCls}-action__item`" />
      <SettingDrawer :class="`${prefixCls}-action__item`" />
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import { computed, unref } from 'vue';
  import LayoutTrigger from './LayoutTrigger.vue';
  import LayoutBreadcrumb from './LayoutBreadcrumb.vue';
  import AppSearch from '@/components/application/search/AppSearch.vue';
  import Notify from './notify/Notify.vue';
  import FullScreen from './FullScreen.vue';
  import AppLocalePicker from '@/components/application/AppLocalePicker.vue';
  import UserDropdown from './UserDropdown.vue';
  import SettingDrawer from './setting/SettingDrawer.vue';
  import { useHeaderSetting } from '@/settings/useHeaderSetting';
  import { useAppInject } from '@/hooks/web/useAppInject';

  const { prefixCls } = useDesign('layout-header');

  const { getHeaderTheme } = useHeaderSetting();
  const { getIsMobile } = useAppInject();

  const getHeaderClass = computed(() => {
    return [
      prefixCls,
      `${prefixCls}--${unref(getHeaderTheme)}`,
      { [`${prefixCls}--mobile`]: unref(getIsMobile) },
    ];
  });
</script>
<style lang="less">
  @import './header.less';
</style>
