<!--
 * @Author: ZLun
 * @Description: search-footer
-->
<template>
  <div :class="prefixCls">
    <span :class="`${prefixCls}-item`">
      <Icon icon="ant-design:enter-outlined" />
    </span>
    <span>{{ t('component.app.toSearch') }}</span>
    <span :class="`${prefixCls}-item`" class="ml-3">
      <Icon icon="ion:arrow-up-outline" />
    </span>
    <span :class="`${prefixCls}-item`">
      <Icon icon="ion:arrow-down-outline" />
    </span>
    <span>{{ t('component.app.toNavigate') }}</span>
    <span :class="`${prefixCls}-item`" class="ml-3">
      <Icon icon="mdi:keyboard-esc" />
    </span>
    <span>{{ t('common.closeText') }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import Icon from '@/components/icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const { prefixCls } = useDesign('app-search-footer');
  const { t } = useI18n();
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-app-search-footer';
  .@{prefix-cls}{
    display: flex;
    font-size: 12px;
    &-item{
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: .4em;
      width: 18px;
      box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgb(30 35 90 / 40%);
    }
  }
</style>
