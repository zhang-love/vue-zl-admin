<!--
 * @Author: ZLun
 * @Description: workbench
-->
<template>
  <div class="enter-y">
    <WorkbenchHeader class="enter-y" />
    <div class="lg:flex m-4 enter-y">
      <div class="w-full lg:w-6/10 lg:mr-4">
        <ProjectCard />
        <DynamicInfo class="!my-4" />
      </div>
      <div class="lg:w-4/10 w-full">
        <QuickNav />
        <VisitSalesRadar class="!lg:my-4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import ProjectCard from './components/ProjectCard.vue';
  import DynamicInfo from './components/DynamicInfo.vue';
  import QuickNav from './components/QuickNav.vue';
  import VisitSalesRadar from './components/VisitSalesRadar.vue';
</script>
<style lang="less" scoped></style>
