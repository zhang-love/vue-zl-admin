<!--
 * @Author: ZLun
 * @Description: notice-list
-->
<template>
  <a-list bordered :data-source="getData" :pagination="pagination">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta>
          <template #avatar v-if="item.avatar">
            <a-avatar :src="item.avatar" />
          </template>
          <template #title>
            <a-typography-paragraph
              :ellipsis="{
                rows: rows,
              }"
              :content="item.title"
            />
          </template>
          <template #description>
            <span>{{ item.datetime }}</span>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
  import { watch, computed, PropType, Ref, ref, unref, watchEffect } from 'vue';
  import type { ListItem } from './data';

  const props = defineProps({
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
    rows: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    page: {
      type: Number,
      default: 1,
    },
  });
  const emit = defineEmits(['update:page']);
  const currentPage: Ref<number> = ref(props.page);
  watch(
    () => props.page,
    (val) => {
      currentPage.value = val;
      emit('update:page', val);
    },
    { immediate: true },
  );
  const pagination = computed(() => {
    return {
      total: props.list.length,
      current: unref(currentPage),
      pageSize: props.pageSize,
      onChange(page: number) {
        currentPage.value = page;
      },
    };
  });

  const getData = computed(() => {
    const { list, pageSize } = props;
    return list.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize);
  });
</script>
<style lang="less" scoped>
  .ant-list-item-meta-title .ant-typography {
    margin-bottom: 4px;
  }
  .ant-list-item {
    min-width: 200px;
    max-width: 300px;
  }
</style>
