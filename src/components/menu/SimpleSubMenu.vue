<!--
 * @Author: ZLun
 * @Description: sub-menu
-->
<template>
  <a-menu-item v-if="menuHiddenChildren(item)" :key="item.path">
    <template #icon v-if="getIcon">
      <Icon :icon="getIcon" />
    </template>
    <span v-if="!getIsCollapseParent && item?.meta?.title">{{ t(item.meta.title as string) }}</span>
  </a-menu-item>
  <a-sub-menu v-else :key="`${item.path}`">
    <template #icon v-if="getIcon">
      <Icon :icon="getIcon" />
    </template>
    <template #title v-if="item?.meta?.title">{{ t(item?.meta?.title as string) }}</template>
    <template v-if="item?.children && item?.children?.length > 0">
      <SimpleSubMenu
        v-for="subItem in item.children"
        :key="subItem.path"
        :item="subItem"
        :collapse="collapse"
      />
    </template>
  </a-sub-menu>
</template>

<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { Menu } from '@/router/types';
  import { useAppStore } from '@/store/modules/app';
  import { computed, PropType, watchEffect } from 'vue';
  import Icon from '@/components/icon/Icon.vue';

  const props = defineProps({
    item: {
      type: Object as PropType<Menu>,
      default: () => {},
    },
    collapse: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: '',
    },
  });

  const appStore = useAppStore();

  const getShowMenu = computed(() => !props.item?.meta?.hideMenu);
  const getIcon = computed(() => props.item?.icon);
  const getIsCollapseParent = computed(() => !!props.collapse && !!props.parent);

  const { t } = useI18n();
  function menuHiddenChildren(menuItem: Menu) {
    if (!menuItem) return;
    return (
      menuItem.meta?.hideChildrenInMenu ||
      !Reflect.has(menuItem, 'children') ||
      !menuItem.children ||
      menuItem.children.length === 0
    );
  }
</script>
<style lang="less"></style>
