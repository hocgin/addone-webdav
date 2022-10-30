import { defineConfig } from 'umi';

export default defineConfig({
  ssr: {
    devServerRender: true,
  },
  hash: true,
  define: {
    // api 地址
    baseUrl: '',
    // 单点登录地址
    ssoServerUrl: '/login',
  },
});
