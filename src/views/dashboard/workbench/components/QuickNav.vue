<!--
 * @Author: ZLun
 * @Description: quick-nav
-->
<template>
  <a-card title="快捷导航">
    <template #extra>
      <a href="#">更多</a>
    </template>
    <a-card-grid v-for="item in navItems" :key="item.icon">
      <div class="flex flex-col justify-center items-center">
        <Icon :icon="item.icon" :color="item.color" :size="22" />
        <span class="text-md mt-2">{{ item.title }}</span>
      </div>
    </a-card-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import Icon from '@/components/icon/Icon.vue';
  const navItems = [
    {
      title: '首页',
      icon: 'ion:home-outline',
      color: '#1fdaca',
    },
    {
      title: '仪表盘',
      icon: 'ion:grid-outline',
      color: '#bf0c2c',
    },
    {
      title: '组件',
      icon: 'ion:layers-outline',
      color: '#e18525',
    },
    {
      title: '系统管理',
      icon: 'ion:settings-outline',
      color: '#3fb27f',
    },
    {
      title: '权限管理',
      icon: 'ion:key-outline',
      color: '#4daf1bc9',
    },
    {
      title: '图表',
      icon: 'ion:bar-chart-outline',
      color: '#00d8ff',
    },
  ];
</script>
<style lang="less"></style>
