import { useDesign } from '@/hooks/web/useDesign';
import { listenerRouteChange } from '@/logics/mitt/routeChange';
import { useTabsTore } from '@/store/modules/tabs';
import Sortable from 'sortablejs';
import { computed, onMounted, Ref, ref, unref } from 'vue';
import { RouteLocationNormalized } from 'vue-router';

export function useLayoutTabs() {
  const tabStore = useTabsTore();
  const { prefixCls } = useDesign('layout-tabs');
  const curRoute = ref();
  const curPath = ref();
  const tabList: Ref<RouteLocationNormalized[]> = ref([]);
  const getTabList = computed(() => tabStore.getTabList);
  tabList.value = tabStore.getTabList;
  const curIndex = computed(() =>
    tabList.value.findIndex((item) => item.path === unref(curRoute)?.path),
  );
  listenerRouteChange((route?: RouteLocationNormalized) => {
    tabStore.addTab(unref(route));
    curRoute.value = route;
    curPath.value = route?.path;
  });
  function initDrag() {
    onMounted(() => {
      const el = document.querySelectorAll(
        `.${prefixCls} .ant-tabs-nav-wrap > div`,
      )?.[0] as HTMLElement;
      const ops: Sortable.Options = {
        animation: 200,
        group: 'name',
        onEnd: function (evt: Sortable.SortableEvent) {
          const { oldIndex, newIndex } = evt;
          tabStore.sortTabs(oldIndex || 0, newIndex || 0);
        },
      };
      Sortable.create(el, ops);
    });
  }

  initDrag();
  return {
    initDrag,
    prefixCls,
    curIndex,
    curRoute,
    curPath,
    getTabList,
  };
}
