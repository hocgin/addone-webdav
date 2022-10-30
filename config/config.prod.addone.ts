import {defineConfig} from 'umi';
import {BrowserAddoneExtensionsType} from '@hocgin/umijs-plugin-browser-addone';

export default defineConfig({
  define: {
    // api 地址
    baseUrl: '',
    // 单点登录地址
    ssoServerUrl: '/login',
  },
  extraBabelPlugins: ['transform-remove-console'],
  plugins: ['@hocgin/umijs-plugin-browser-addone'],
  extensions: {
    icons: '../public/logo.jpg',
    contentScripts: [
      {
        matches: ['https://baidu.com/*'],
        entries: ['@/pages/_tpl/contentScripts/github'],
      },
      {
        matches: ['https://baidu.com/*', 'https://www.baidu.com/*'],
        entries: ['@/pages/_tpl/contentScripts/baidu'],
        runAt: 'document_end',
      },
    ],
    background: {
      serviceWorker: '@/pages/_tpl/background/index',
    },
    permissions: [
      'contextMenus',
      'webRequest',
      'storage',
      'notifications',
    ],
    hostPermissions: ['<all_urls>'],
  } as BrowserAddoneExtensionsType,
});
