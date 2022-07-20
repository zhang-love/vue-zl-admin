<!--
 * @Author: ZLun
 * @Description: dashbord-analysis
-->
<template>
  <div class="p-4">
    <GrowCard class="enter-y" />
    <SiteAnalysis class="enter-y" />
    <div class="md:flex enter-y">
      <VisitRadar class="!mt-4 md:w-1/3 !md:mr-4" />
      <VisitSource class="!mt-4 md:w-1/3 !md:mr-4" />
      <VisitSales class="!mt-4 md:w-1/3" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import VisitSales from './components/VisitSales.vue';
  import VisitSource from './components/VisitSource.vue';
</script>
<style lang="less" scoped></style>
