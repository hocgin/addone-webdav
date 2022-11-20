import {defaultRequestOptions, LangKit} from '@hocgin/hkit';
import Config from '@/config';
import {message} from 'antd';
import {WebExtension} from "@hocgin/browser-addone-kit";

// 网络请求配置
defaultRequestOptions({
  baseUrl: Config.getBaseUrl(),
  ssoServerUrl: Config.getSsoServerUrl(),
  addHeaders: async () => {
    let headers: any = {};
    if (Config.isDev()) {
      headers['X-Username'] = 'hocgin';
    }
    headers['Authorization'] = `Bearer ${await WebExtension.kit.getUserToken()}`;
    return headers;
  },
  errorHandler: (error: any) =>
    LangKit.isBrowser() && message.error(error.message),
});
