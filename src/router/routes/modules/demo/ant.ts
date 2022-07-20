import { t } from '@/hooks/web/useI18n';
import { LAYOUT } from '@/router/constants';
import { AppRouteModule } from '@/router/types';

const ant: AppRouteModule = {
  path: '/ant',
  name: 'Ant',
  component: LAYOUT,
  meta: {
    title: t('routes.demo.ant.generate'),
    icon: 'ion:layers-outline',
    orderNo: 300,
  },
  children: [
    {
      path: 'generate',
      name: 'Generate',
      meta: {
        title: t('routes.demo.ant.ant'),
      },
      component: () => import('@/views/demo/ant/index.vue'),
    },
  ],
};

export default ant;
