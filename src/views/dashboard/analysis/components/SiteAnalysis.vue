<!--
 * @Author: ZLun
 * @Description: site-analysis
-->
<template>
  <a-card :tab-list="tabList" class="!my-4" :active-tab-key="activeTab" @tabChange="onTabChange">
    <VisitAnalysis v-if="activeTab === 'line'" />
    <VisitAnalysisBar v-if="activeTab === 'bar'" />
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import VisitAnalysis from './VisitAnalysis.vue';
  import VisitAnalysisBar from './VisitAnalysisBar.vue';
  const tabList = ref([
    {
      key: 'line',
      tab: '流量趋势',
    },
    {
      key: 'bar',
      tab: '访问量',
    },
  ]);
  const activeTab = ref('line');
  const onTabChange = (key: string) => {
    activeTab.value = key;
  };
</script>
<style lang="less"></style>
