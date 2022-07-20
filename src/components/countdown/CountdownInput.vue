<!--
 * @Author: ZLun
 * @Description: countdown-input
-->
<template>
  <a-input v-bind="$attrs" :class="prefixCls">
    <template #addonAfter>
      <a-button @click="handleStart" :disabled="isStart" size="large">
        {{ getButtonText }}
      </a-button>
    </template>
  </a-input>
</template>

<script lang="ts" setup>
  import { useCountdown } from './useCountdown';
  import { computed, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useDesign } from '@/hooks/web/useDesign';

  const { t } = useI18n();

  const { prefixCls } = useDesign('countdown-input');

  const { isStart, currentCount, handleStart } = useCountdown(60);

  const getButtonText = computed(() => {
    return !unref(isStart)
      ? t('component.countdown.normalText')
      : t('component.countdown.sendText', [unref(currentCount)]);
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-countdown-input';
  .@{prefix-cls} {
    .ant-input-group-addon {
      padding-right: 0;
      background-color: transparent;
      border: 0;
      button {
        font-size: 14px;
      }
    }
  }
</style>
