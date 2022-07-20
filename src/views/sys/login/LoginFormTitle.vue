<!--
 * @Author: ZLun
 * @Description: 
-->
<template>
  <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
    {{ title }}
  </h2>
</template>

<script lang="ts" setup>
  const { title } = defineProps({
    title: {
      type: String,
      default: '',
    },
  });
</script>
<style lang="less" scoped></style>
