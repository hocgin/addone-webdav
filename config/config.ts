import {defineConfig} from 'umi';
import routerConfig from '../src/router.config';

export default defineConfig({
  title: 'HOCGIN',
  locale: {
    antd: true,
  },
  antd: {},
  dva: {},
  qiankun: {
    slave: {
      shouldNotModifyDefaultBase: true,
    },
  },
  outputPath: './dist',
  favicon: 'https://cdn.hocgin.top/uPic/favicon.ico',
  nodeModulesTransform: {
    type: 'none',
  },
  manifest: {
    fileName: `manifest.json`,
  },
  fastRefresh: {},
  proxy: {
    '/api': {
      // => 转到服务端地址
      target: 'http://127.0.0.1:20001/',
      changeOrigin: true,
      pathRewrite: {'^/api': ''},
    },
  },
  theme: {
    '@primary-color': '#262626',
  },
  routes: [...routerConfig],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@hocgin/ui',
        camel2DashComponentName: false,
        style: true,
      },
      '@hocgin/ui',
    ],
  ],
});
