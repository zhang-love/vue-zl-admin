import { Router } from 'vue-router';
import { setRouteChange } from '@/logics/mitt/routeChange';
import { useUserStoreWithOut } from '@/store/modules/user';
import { useAppStoreWithOut } from '@/store/modules/app';
import { createPermissionGuard } from './permissionGuard';

export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createPermissionGuard(router);
}

function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path);
    setRouteChange(to);
    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const appStore = useAppStoreWithOut();

  router.beforeEach(async (to) => {
    if (!userStore.getToken) return true;

    if (to.meta.loaded) return true;

    appStore.setPageLoading(true);
    return true;
  });

  router.afterEach(async (to) => {
    appStore.setPageLoading(false);

    return true;
  });
}

function createHttpGuard(router: Router) {
  router.beforeEach(() => {
    return true;
  });
}
