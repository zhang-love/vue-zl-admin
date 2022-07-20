import 'virtual:windi.css';
import 'virtual:svg-icons-register';
import App from './App.vue';
// import 'ant-design-vue/dist/antd.less';
import './design/index.less';
import 'ant-design-vue/dist/antd.variable.min.css';
// import 'ant-design-vue/dist/antd.variable.min.css';
// import 'ant-design-vue/dist/antd.less';
import Antd from 'ant-design-vue';
// import './design/my.less';
import { createApp } from 'vue';
import { setupStore } from './store';
import { setupI18n } from '@/locales/setupI18n';

import { initAppConfigStore } from './logics/initAppConfig';
import { router, setupRouter } from './router';
import { setupRouterGuard } from './router/guard';
import { registerGlobComp } from './components/registerGlobComp';

async function bootstrap() {
  const app = createApp(App);

  app.use(Antd);

  setupStore(app);

  initAppConfigStore();

  registerGlobComp(app);

  await setupI18n(app);

  setupRouter(app);

  setupRouterGuard(router);

  app.mount('#app');
}
bootstrap();
