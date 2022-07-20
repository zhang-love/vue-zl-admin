<!--
 * @Author: ZLun
 * @Description: icon usage
-->
<template>
  <svg :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const { size, prefix, name } = defineProps({
    size: {
      type: [Number],
      default: 16,
    },
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      default: '',
    },
  });

  const symbolId = computed(() => `#${prefix}-${name}`);

  const getStyle = computed(() => {
    const s = `${size}px`;
    return {
      width: s,
      height: s,
    };
  });
</script>
<style lang="less" scoped></style>
