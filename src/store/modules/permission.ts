import { PermissionModeEnum } from '@/enums/appEnum';
import { transformRouteToMenu } from '@/router/helper/menuHelper';
import { flatMultiLevelRoutes } from '@/router/helper/routeHelper';
import { asyncRoutes } from '@/router/routes';
import { AppRouteRecordRaw, Menu } from '@/router/types';
import projectSetting from '@/settings/projectSetting';
import { filter } from '@/utils/helper/treeHelper';
import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import { store } from '..';
import { useAppStoreWithOut } from './app';
import { useUserStoreWithOut } from './user';

interface PermissionState {
  // Permission code list
  permCodeList: string[] | number[];
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  lastBuildMenuTime: number;
  // Backstage menu list
  backMenuList: Menu[];
  frontMenuList: Menu[];
}
export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    isDynamicAddedRoute: false,
    backMenuList: [],
    frontMenuList: [],
    lastBuildMenuTime: 0,
    permCodeList: [],
  }),
  getters: {
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList;
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
  },
  actions: {
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list;
    },
    setIsDynamicAddedRoute(isDynamicAddedRoute: boolean) {
      this.isDynamicAddedRoute = isDynamicAddedRoute;
    },
    buildRoutesAction() {
      const appStore = useAppStoreWithOut();
      const userStore = useUserStoreWithOut();
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;

      const roleList = toRaw(userStore.getRoleList) || [];
      let routes: AppRouteRecordRaw[] = [];

      const routeFilter = (route: AppRouteRecordRaw) => {
        if (!route?.meta?.roles) return true;
        const roles = route.meta.roles;
        return roleList.some((role) => (roles as string[]).includes(role));
      };
      switch (permissionMode) {
        case PermissionModeEnum.ROUTE_MAPPING: {
          routes = filter(asyncRoutes as AppRouteRecordRaw[], routeFilter);
          const menuList = transformRouteToMenu(routes, true);
          menuList.sort((a, b) => {
            return (a.meta.orderNo as number) - (b.meta.orderNo as number);
          });
          this.setFrontMenuList(menuList);
          routes = flatMultiLevelRoutes(routes);
          break;
        }
      }
      return routes;
    },
  },
});

export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
