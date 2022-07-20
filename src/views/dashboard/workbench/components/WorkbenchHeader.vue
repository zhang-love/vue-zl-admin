<!--
 * @Author: ZLun
 * @Description: workbench-header
-->
<template>
  <a-card>
    <div class="flex py-4 px-6">
      <a-avatar :src="userInfo?.avatar || headerImg" :size="72" />
      <div class="ml-6">
        <h1 class="md:text-lg text-md">早安，{{ userInfo?.realName }}，开始您一天的工作吧！</h1>
        <div class="text-secondary">今日晴，20℃ - 32℃！</div>
      </div>
      <div class="flex flex-1 justify-end items-center text-right">
        <div class="flex flex-col justify-end">
          <div class="text-secondary">待办</div>
          <div class="text-2xl">2/10</div>
        </div>
        <div class="flex flex-col justify-end md:mx-16 mx-12 text-right">
          <div class="text-secondary">项目</div>
          <div class="text-2xl">8</div>
        </div>
        <div class="flex flex-col justify-end text-right">
          <div class="text-secondary">团队</div>
          <div class="text-2xl">300</div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user';
  import { computed } from 'vue';
  import headerImg from '@/assets/images/header.jpg';

  const userStore = useUserStore();
  const userInfo = computed(() => userStore.getUserInfo);
</script>
<style lang="less"></style>
