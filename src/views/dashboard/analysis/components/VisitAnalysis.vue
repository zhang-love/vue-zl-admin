<!--
 * @Author: ZLun
 * @Description: visit-analysis
-->
<template>
  <div ref="echartRef" style="height: 280px"></div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { EChartsOption } from 'echarts';
  import { useEcharts } from '@/hooks/web/useEcharts';

  const echartRef = ref();
  let option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: '#019680',
        },
      },
    },
    grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
    xAxis: {
      type: 'category',
      data: [...new Array(12)].map((_item, index) => `${index + 1}月`),
    },
    yAxis: {
      type: 'value',
      max: 8000,
      splitNumber: 4,
    },
    series: [
      {
        data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
        type: 'bar',
        barMaxWidth: 80,
      },
    ],
  };
  useEcharts(echartRef, option);
</script>
<style lang="less"></style>
