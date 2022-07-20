<!--
 * @Author: ZLun
 * @Description: fullscreen
-->
<template>
  <a-tooltip :title="getTitle">
    <span @click="toggle">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </a-tooltip>
</template>

<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { useFullscreen } from '@vueuse/core';
  import { computed, unref } from 'vue';
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';

  const { t } = useI18n();
  const { toggle, isFullscreen } = useFullscreen();

  const getTitle = computed(() => {
    return unref(isFullscreen)
      ? t('layout.header.tooltipExitFull')
      : t('layout.header.tooltipEntryFull');
  });
</script>
<style lang="less"></style>
