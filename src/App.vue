<script setup lang="ts">
  import AppProvider from '@/components/application/AppProvider.vue';
  import { useLocale } from '@/locales/useLocale';
  import { ConfigProvider } from 'ant-design-vue';
  const { getAntdLocale } = useLocale();
</script>

<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<style></style>
