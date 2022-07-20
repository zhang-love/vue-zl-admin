import { PageEnum } from '@/enums/pageEnum';
import { t } from '@/hooks/web/useI18n';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '../basic';
import { AppRouteModule } from '../types';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];
export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

export const basicRoutes: RouteRecordRaw[] = [LoginRoute, RootRoute, REDIRECT_ROUTE];
