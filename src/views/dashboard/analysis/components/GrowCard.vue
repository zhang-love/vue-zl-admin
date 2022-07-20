<!--
 * @Author: ZLun
 * @Description: grow-card
-->
<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.icon">
      <a-card
        class="md:w-1/4 mt-0 !md:mt-0"
        :title="item.title"
        size="small"
        :class="{ '!mt-4': index > 0, '!md:mr-4': index < growCardList.length - 1 }"
      >
        <template #extra>
          <div class="flex w-full">
            <a-tag :color="item.color">
              {{ item.action }}
            </a-tag>
          </div>
        </template>
        <div class="flex justify-between p-4 items-center">
          <div class="text-2xl">
            {{ `$${item.value}` }}
          </div>
          <Icon :icon="item.icon" :size="40" />
        </div>
        <div class="flex justify-between px-4 py-2">
          <div> 总{{ item.title }} </div>
          <div>
            {{ `$${item.total}` }}
          </div>
        </div>
      </a-card>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Icon from '@/components/icon/Icon.vue';

  const growCardList = ref([
    {
      title: '访问数',
      icon: 'visit-count|svg',
      value: 2000,
      total: 120000,
      color: 'green',
      action: '月',
    },
    {
      title: '成交额',
      icon: 'total-sales|svg',
      value: 20000,
      total: 500000,
      color: 'blue',
      action: '月',
    },
    {
      title: '下载数',
      icon: 'download-count|svg',
      value: 8000,
      total: 120000,
      color: 'orange',
      action: '周',
    },
    {
      title: '成交数',
      icon: 'transaction|svg',
      value: 5000,
      total: 50000,
      color: 'purple',
      action: '年',
    },
  ]);
</script>
<style lang="less"></style>
