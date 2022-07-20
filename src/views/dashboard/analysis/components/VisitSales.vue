<!--
 * @Author: ZLun
 * @Description: visit-source 
-->
<template>
  <a-card title="成交占比">
    <div ref="echartRef" style="height: 280px"></div>
  </a-card>
</template>

<script lang="ts" setup>
  import { useEcharts } from '@/hooks/web/useEcharts';
  import { EChartsOption } from 'echarts';
  import { ref } from 'vue';

  const echartRef = ref();

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },

    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '80%',
        center: ['50%', '50%'],
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        data: [
          { value: 500, name: '电子产品' },
          { value: 310, name: '服装' },
          { value: 274, name: '化妆品' },
          { value: 400, name: '家居' },
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 400;
        },
      },
    ],
  };
  useEcharts(echartRef, option);
</script>
<style lang="less"></style>
