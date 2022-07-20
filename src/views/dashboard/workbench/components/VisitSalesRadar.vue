<!--
 * @Author: ZLun
 * @Description: visit-source 
-->
<template>
  <a-card title="销售统计">
    <div ref="echartRef" style="height: 280px"></div>
  </a-card>
</template>

<script lang="ts" setup>
  import { useEcharts } from '@/hooks/web/useEcharts';
  import { EChartsOption } from 'echarts';
  import { ref } from 'vue';

  const echartRef = ref();

  const option: EChartsOption = {
    legend: {
      bottom: 0,
      data: ['Visits', 'Sales'],
    },
    tooltip: {},
    radar: {
      radius: '60%',
      splitNumber: 8,
      indicator: [
        {
          text: '2017',
          max: 100,
        },
        {
          text: '2017',
          max: 100,
        },
        {
          text: '2018',
          max: 100,
        },
        {
          text: '2019',
          max: 100,
        },
        {
          text: '2020',
          max: 100,
        },
        {
          text: '2021',
          max: 100,
        },
      ],
    },
    series: [
      {
        type: 'radar',
        symbolSize: 0,
        areaStyle: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1,
        },
        data: [
          {
            value: [90, 50, 86, 40, 50, 20],
            name: 'Visits',
            itemStyle: {
              color: '#b6a2de',
            },
          },
          {
            value: [70, 75, 70, 76, 20, 85],
            name: 'Sales',
            itemStyle: {
              color: '#67e0e3',
            },
          },
        ],
      },
    ],
  };
  useEcharts(echartRef, option);
</script>
<style lang="less"></style>
