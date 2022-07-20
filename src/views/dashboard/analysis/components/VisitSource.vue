<!--
 * @Author: ZLun
 * @Description: visit-source 
-->
<template>
  <a-card title="访问来源">
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
    legend: {
      bottom: '1%',
      left: 'center',
    },
    series: [
      {
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
        ],
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 100;
        },
      },
    ],
  };
  useEcharts(echartRef, option);
</script>
<style lang="less"></style>
