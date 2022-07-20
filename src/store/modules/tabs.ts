import { LAYOUT_TABS_KEY } from '@/enums/cacheEnum';
import { PageEnum } from '@/enums/pageEnum';
import { useGo, useRedo } from '@/hooks/web/usePage';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/basic';
import { REDIRECT_NAME } from '@/router/constants';
import { getRawRoute } from '@/utils';
import { Persistent } from '@/utils/cache/persistent';
import { defineStore } from 'pinia';
import { toRaw, unref } from 'vue';
import { RouteLocationNormalized, Router } from 'vue-router';

interface TabsTate {
  tabList: RouteLocationNormalized[];
  lastDragEndIndex: number;
}
function handleGotoPage(router: Router) {
  const go = useGo(router);
  go(unref(router.currentRoute).path, true);
}
export const useTabsTore = defineStore({
  id: 'app-tabs',
  state: (): TabsTate => ({
    tabList: Persistent.getLocal(LAYOUT_TABS_KEY) || [],
    lastDragEndIndex: 0,
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList;
    },
  },
  actions: {
    getRouteExpand(router: Router) {
      const { currentRoute } = router;
      const route = unref(currentRoute);
      return {
        ...router,
        route,
        routeIndex: this.tabList.findIndex((item) => item.path === route.path),
      };
    },
    getTabExpand(route?: RouteLocationNormalized) {
      if (!route) return;
      return this.tabList.findIndex((item) => item.path === route.path);
    },
    goToPage(router: Router) {
      const go = useGo(router);

      let toPath: PageEnum | string = PageEnum.BASE_HOME;
      const len = this.tabList.length;
      if (len > 0) {
        const page = this.tabList[len - 1];
        toPath = page.fullPath || page.path;
      }
      go(toPath);
    },
    async refreshPage(router: Router) {
      const redo = useRedo(router);
      await redo();
    },
    async closeTab(router: Router, tabIndex: number) {
      const tab = this.tabList[tabIndex];
      const { routeIndex } = this.getRouteExpand(router);
      const { replace } = router;
      const len = this.tabList.length;
      if (tab?.meta?.affix) {
        return;
      }
      this.tabList.splice(tabIndex, 1);
      Persistent.setLocal(LAYOUT_TABS_KEY, this.tabList);
      if (routeIndex === tabIndex) {
        if (this.tabList.length === 0) {
          this.redirectBaseHome(router);
        }
        if (tabIndex === len - 1) {
          await replace(this.tabList[tabIndex - 1]);
        } else {
          await replace(this.tabList[tabIndex]);
        }
      }
    },
    async redirectBaseHome(router: Router) {
      router.currentRoute.value.name = PageEnum.BASE_HOME;
      this.refreshPage(router);
    },
    async closeAllTab(router: Router) {
      this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false);
      Persistent.setLocal(LAYOUT_TABS_KEY, this.tabList);
      // this.goToPage(router);
      this.redirectBaseHome(router);
    },
    async closeLeftTabs(router: Router) {
      let { routeIndex } = this.getRouteExpand(router);
      let startIndex = 0;
      while (startIndex < routeIndex) {
        const cur = this.tabList[startIndex];
        if (!cur?.meta?.affix) {
          this.tabList.splice(startIndex, 1);
          routeIndex--;
        } else {
          startIndex++;
        }
      }
      Persistent.setLocal(LAYOUT_TABS_KEY, this.tabList);
    },
    async closeRightTabs(router: Router) {
      const { routeIndex } = this.getRouteExpand(router);
      let startIndex = routeIndex + 1;
      let len = this.tabList.length;
      while (startIndex < len) {
        const cur = this.tabList[startIndex];
        if (!cur?.meta?.affix) {
          this.tabList.splice(startIndex, 1);
          len--;
        } else {
          startIndex++;
        }
      }
      Persistent.setLocal(LAYOUT_TABS_KEY, this.tabList);
    },
    async closeOtherTabs(router: Router) {
      this.closeLeftTabs(router);
      this.closeRightTabs(router);
    },
    async addTab(route?: RouteLocationNormalized) {
      if (!route) return;
      const { path, name, fullPath, params, query } = getRawRoute(route);
      if (
        path === PageEnum.ERROR_PAGE ||
        path === PageEnum.BASE_LOGIN ||
        !name ||
        [REDIRECT_NAME, REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name as string)
      ) {
        return;
      }

      let updateIndex = -1;
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index;
        return (tab.fullPath || tab.path) === (fullPath || path);
      });

      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex];
        if (!curTab) {
          return;
        }
        curTab.params = params || curTab.params;
        curTab.query = query || curTab.query;
        curTab.fullPath = fullPath || curTab.fullPath;
        this.tabList.splice(updateIndex, 1, curTab);
      } else {
        this.tabList.push(route);
      }
      Persistent.setLocal(LAYOUT_TABS_KEY, this.tabList);
    },
    // Sort the tabs
    async sortTabs(oldIndex: number, newIndex: number) {
      const currentTab = this.tabList[oldIndex];
      this.tabList.splice(oldIndex, 1);
      this.tabList.splice(newIndex, 0, currentTab);
      this.lastDragEndIndex = this.lastDragEndIndex + 1;
      Persistent.setLocal(LAYOUT_TABS_KEY, this.tabList);
    },
  },
});
