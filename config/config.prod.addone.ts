import { defineConfig } from 'umi';
import { BrowserAddoneExtensionsType } from '@hocgin/umijs-plugin-browser-addone';

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
    name: '__MSG_extension_name__',
    description: '__MSG_extension_description__',
    icons: '../public/logo.jpg',
    defaultLocale: 'zh_CN',
    action: {
      defaultTitle: '打开仪表盘',
    },
    background: {
      serviceWorker: '@/pages/background/index',
    },
    permissions: [
      'action',
      'downloads',
      'contextMenus',
      'webRequest',
      'storage',
      'notifications',
    ],
    hostPermissions: ['<all_urls>'],
    override: {
      commands: {
        open_dashboard: {
          suggested_key: {
            default: 'Alt+O',
            mac: 'Alt+O',
          },
          description: 'Open Dashboard',
        },
      },
    },
  } as BrowserAddoneExtensionsType,
});
