import { defineConfig } from 'umi';

let dirs = __dirname.split('/');
let dirName = dirs[dirs.length - 2];

export default defineConfig({
  ssr: {
    devServerRender: true,
  },
  define: {
    // api 地址
    baseUrl: '',
    // 单点登录地址
    ssoServerUrl: '/login',
  },
  hash: true,
  // cdn 地址
  publicPath: `https://cdn.hocgin.top/${dirName}/`,
});
