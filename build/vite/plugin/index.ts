import PurgeIcons from 'vite-plugin-purge-icons';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configThemePlugin } from './theme';
import { configSvgIconsPlugin } from './svgSprite';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import { configCompressPlugin } from './compress';
import { configPwaConfig } from './pwa';
import { configImageminPlugin } from './imagemin';
import { configVisualizerConfig } from './visualizer';
import VitePluginCertificate from 'vite-plugin-mkcert';

import { configStyleImportPlugin } from './styleImport';
// import externalGlobals from 'rollup-plugin-external-globals';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
  } = viteEnv;

  const vitePlugins: any[] = [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    monacoEditorPlugin(),
    // Components({
    //   resolvers: [
    //     AntDesignVueResolver({
    //       importStyle: 'less',
    //     }),
    //   ],
    // }),
    VitePluginCertificate({
      source: 'coding',
    }),
    // externalGlobals({
    //   'monaco-editor': 'monaco-editor',
    // }),
  ];

  vitePlugins.push(PurgeIcons());

  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  vitePlugins.push(configSvgIconsPlugin(isBuild));

  vitePlugins.push(configStyleImportPlugin(isBuild));

  // vitePlugins.push(configThemePlugin(isBuild));

  vitePlugins.push(...WindiCSS());

  vitePlugins.push(configVisualizerConfig());

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv));
  }

  return vitePlugins;
}
