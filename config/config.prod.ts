import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    // api 地址
    baseUrl: '',
    // 单点登录地址
    ssoServerUrl: '/login',
  },
  extraBabelPlugins: ['transform-remove-console'],
});
