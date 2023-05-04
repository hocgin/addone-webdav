import {defineConfig} from 'umi';
import {BrowserAddoneExtensionsType} from '@hocgin/umijs-plugin-browser-addone';
import {WebExtension} from '@hocgin/browser-addone-kit';
import pkg from '../package.json';

export default defineConfig({
  define: {
    // api 地址
    baseUrl: 'https://api.hocgin.top',
    // 单点登录地址
    ssoServerUrl: '/login',
    projectId: pkg.name,
  },
  plugins: ['@hocgin/umijs-plugin-browser-addone'],
  extensions: {
    name: '__MSG_extension_name__',
    description: '__MSG_extension_description__',
    icons: '../public/logo.png',
    homepageUrl: `https://logspot.hocgin.top/${pkg.name}`,
    defaultLocale: 'en',
    action: {
      defaultTitle: '__MSG_extension_action_title__',
    },
    background: {
      serviceWorker: '@/pages/background/index',
    },
    permissions: ['scripting', 'downloads', 'contextMenus', 'storage'],
    contentScripts: [
      WebExtension.kit.tbkScriptConfig(['@/pages/contentscripts/tbk']),
      WebExtension.kit.authorizationScriptConfig(['@/pages/contentscripts/authorization']),
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
