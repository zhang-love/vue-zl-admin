<!--
 * @Author: ZLun
 * @Description: multi-language select
-->
<template>
  <a-dropdown trigger="click">
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:language" />
    </span>
    <template #overlay>
      <a-menu @click="menuClick" :selectedKeys="selectedKeys">
        <a-menu-item v-for="item in localeList" :key="item.event">{{ item.text }}</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import Icon from '@/components/icon/Icon.vue';
  import { useLocale } from '@/locales/useLocale';
  import { localeList } from '@/settings/localeSetting';
  import { ref, unref, watchEffect } from 'vue';
  import { MenuInfo } from './typing';

  const { reload } = defineProps({
    reload: {
      type: Boolean,
      default: false,
    },
  });

  const { changeLocale, getLocale } = useLocale();

  const selectedKeys = ref<string[]>([]);

  const menuClick = async ({ key }: MenuInfo) => {
    await changeLocale(key);
    reload && location.reload();
  };

  watchEffect(() => {
    selectedKeys.value = [unref(getLocale)];
  });
</script>
<style lang="less" scoped></style>
