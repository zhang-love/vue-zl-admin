import { cloneDeep, omit } from 'lodash-es';
import { createRouter, createWebHashHistory, Router, RouteRecordNormalized } from 'vue-router';
import { AppRouteModule, AppRouteRecordRaw } from '../types';

export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules = cloneDeep(routeModules);
  for (let i = 0; i < modules.length; i++) {
    const routeModule = modules[i];
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    promoteRouteLevel(routeModule);
  }
  return modules;
}

function isMultipleRoute(routeModule: AppRouteModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false;
  }
  let flag = false;
  const children = routeModule.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}

function promoteRouteLevel(routeModule: AppRouteModule) {
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  });

  const routes = router.getRoutes();
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  routeModule.children = routeModule.children?.map((item) => omit(item, 'children'));
}

function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteModule,
) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const route = routes.find((item) => item.name === child.name);
    if (!route) continue;
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children.push(route as unknown as AppRouteModule);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}
