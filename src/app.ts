import Config from './config';
import {defaultRequestOptions} from '@hocgin/hkit';
import {message} from "antd";
import {addLocale, getAllLocales, localeInfo,} from 'umi';

// 国际化配置
getAllLocales().forEach((locale) => {
  let momentLocale =
    {
      'zh-CN': 'zh-cn',
      'en-US': 'en',
    }[locale] ?? 'zh-cn';
  let localeItem = localeInfo[locale];
  addLocale(locale, localeItem.messages, {
    antd: localeItem.antd,
    momentLocale: !!localeItem.momentLocale
      ? localeItem.momentLocale
      : momentLocale,
  });
});

// 全局状态配置
export async function getInitialState() {
  return {
    author: 'hocgin',
  };
}

// 网络请求配置
defaultRequestOptions({
  baseUrl: Config.getBaseUrl(),
  ssoServerUrl: Config.getSsoServerUrl(),
  addHeaders: async () => {
    let headers: any = {};
    if (Config.isDev()) {
      headers['X-Username'] = "hocgin";
    }
    return headers;
  },
  errorHandler: (error: any) => message.error(error.message),
});
