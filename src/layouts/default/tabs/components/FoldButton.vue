<!--
 * @Author: ZLun
 * @Description: fold-button
-->
<template>
  <span @click="showFull">
    <Icon :icon="getIcon" :key="getIcon" />
  </span>
</template>

<script lang="ts" setup>
  import { useMenuSetting } from '@/settings/useMenuSetting';
  import { useHeaderSetting } from '@/settings/useHeaderSetting';
  import { computed, unref, watchEffect } from 'vue';
  import { triggerWindowResize } from '@/utils/event';
  import Icon from '@/components/icon/Icon.vue';

  const { getShowMenu, setMenuSetting } = useMenuSetting();
  const { getShowHeader, setHeaderSetting } = useHeaderSetting();

  const isNormal = computed(() => !unref(getShowMenu) && !unref(getShowHeader));

  const getIcon = computed(() =>
    unref(isNormal) ? 'codicon:screen-normal' : 'codicon:screen-full',
  );
  function showFull() {
    const normal = unref(isNormal);
    setMenuSetting({
      show: normal,
    });
    setHeaderSetting({ show: normal });
    triggerWindowResize();
  }
</script>
<style lang="less"></style>
