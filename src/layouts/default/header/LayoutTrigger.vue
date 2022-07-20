<!--
 * @Author: ZLun
 * @Description: collapsed
-->
<template>
  <span :class="prefixCls" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
  </span>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import { useMenuSetting } from '@/settings/useMenuSetting';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

  const { prefixCls } = useDesign('layout-trigger');

  const { getCollapsed, toggleCollapsed } = useMenuSetting();
</script>
<style lang="less">
  @layout-trigger: ~'@{namespace}-layout-trigger';
  .@{layout-trigger} {
    cursor: pointer;
  }
</style>
