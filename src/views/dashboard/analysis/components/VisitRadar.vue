<!--
 * @Author: ZLun
 * @Description: radar 
-->
<template>
  <a-card title="转换率">
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
      data: ['访问', '购买'],
    },
    tooltip: {},
    radar: {
      radius: '60%',
      splitNumber: 8,
      indicator: [
        {
          text: '电脑',
          max: 100,
        },
        {
          text: '充电器',
          max: 100,
        },
        {
          text: '耳机',
          max: 100,
        },
        {
          text: '手机',
          max: 100,
        },
        {
          text: 'Ipad',
          max: 100,
        },
        {
          text: '耳机',
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
          // shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1,
        },
        data: [
          {
            value: [90, 50, 86, 40, 50, 20],
            name: '访问',
            itemStyle: {
              color: '#b6a2de',
            },
          },
          {
            value: [70, 75, 70, 76, 20, 85],
            name: '购买',
            itemStyle: {
              color: '#5ab1ef',
            },
          },
        ],
      },
    ],
  };
  useEcharts(echartRef, option);
</script>
<style lang="less"></style>
