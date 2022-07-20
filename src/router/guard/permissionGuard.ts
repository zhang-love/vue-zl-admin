import { PageEnum } from '@/enums/pageEnum';
import { usePermissionStoreWithOut } from '@/store/modules/permission';
import { useUserStoreWithOut } from '@/store/modules/user';
import { Router, RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '../basic';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();

  router.beforeEach(async (to, from, next) => {
    // debugger;
    const token = userStore.getToken;
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout;
        if (!isSessionTimeout) {
          next((to.query?.redirect as string) || '/');
          return;
        }
      }
      next();
      return;
    }

    if (!token) {
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      const redirectData = {
        path: LOGIN_PATH,
        replace: true,
        query: {},
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData?.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }
    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    const routes = permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setIsDynamicAddedRoute(true);
    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      // debugger;
      next(nextData);
    }
  });
}
