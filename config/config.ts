import { defineConfig } from 'umi';
import routerConfig from '../src/router.config';
import { theme } from 'antd';

const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);

export const useLogger = () => {
  let result: any = [];
  let offLogger = process.env.USE_LOG !== 'true';
  console.debug(`[${offLogger ? '禁用' : '启用'}]日志打印`);
  if (offLogger) {
    result.push([
      'transform-remove-console',
      { exclude: ['error', 'warn', 'info'] },
    ]);
  }
  return result;
};

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
      pathRewrite: { '^/api': '' },
    },
  },
  theme: {},
  routes: [...routerConfig],
  extraBabelPlugins: [
    ...useLogger(),
  ],
  lessLoader: {
    modifyVars: {
      ...mapToken,
      // 'ant-prefix': ANT_PREFIX_CLS,
    },
  },
});
