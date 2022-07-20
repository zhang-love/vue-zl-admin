import { computed, onMounted, onUnmounted, Ref, unref, watch } from 'vue';
import * as echarts from 'echarts';
import { useAppStore } from '@/store/modules/app';
import { useDebounceFn } from '@vueuse/shared';
import { ThemeEnum } from '@/enums/appEnum';

export function useEcharts(echartRef: Ref<HTMLDivElement>, option: echarts.EChartsOption) {
  option = { ...option, backgroundColor: 'transparent' };
  let resizeFn: Fn;
  let chartInstance: echarts.ECharts;
  const appStore = useAppStore();
  const theme = computed(() => appStore.getThemeSetting);
  watch(
    () => unref(theme),
    (val) => {
      if (!val) return;
      // initEchart()
      if (chartInstance) {
        chartInstance.dispose();
        initCharts(val as ThemeEnum);
      }
    },
  );

  onUnmounted(() => {
    window?.removeEventListener('resize', resizeFn);
  });
  onMounted(() => {
    resizeFn = useDebounceFn(resize, 200);
    function resize() {
      chartInstance.resize();
    }
    window?.addEventListener('resize', resizeFn);
    initCharts(unref(theme) as ThemeEnum);
  });
  function initCharts(theme = ThemeEnum.LIGHT) {
    chartInstance = echarts.init(unref(echartRef), theme);
    chartInstance.setOption(option);
  }
}
