import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { createVitePlugins } from './build/vite/plugin';
import { wrapperEnv } from './build/utils';
import { generateModifyVars } from './build/generate/generateModifyVars';
import { createProxy } from './build/vite/proxy';
import { OUTPUT_DIR } from './build/constant';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd(); // 获取项目根路径

  const env = loadEnv(mode, root); // 获取vite的配置信息

  const viteEnv = wrapperEnv(env); // 将环境配置写入process.env

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;

  const isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
        },
        {
          find: /build\//,
          replacement: pathResolve('build') + '/',
        },
      ],
    },
    server: {
      https: false,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    // preprocessorOptions 指定传递给 CSS 预处理器的选项
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       modifyVars: generateModifyVars(), // 获取vant的样式变量，然后合并生成新的变量，设置到less
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
    plugins: createVitePlugins(viteEnv, isBuild),
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          javascriptEnabled: true,
          modifyVars: generateModifyVars(), // 获取vant的样式变量，然后合并生成新的变量，设置到less
          additionalData: '@import "./src/design/index.less";',
        },
      },
    },
    optimizeDeps: {
      include: ['@iconify/iconify'],
    },
  };
};
