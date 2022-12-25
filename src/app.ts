import {RequestOptions, getPatcher} from "webdav";
import fetch from "cross-fetch";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '@/request.config';

dayjs.extend(relativeTime);

// webdav 兼容 fetch
getPatcher().patch("request", (opts: RequestOptions | any) => {
  console.log('patch', opts);
  return fetch(opts.url, {
    method: opts.method,
    headers: opts.headers,
    body: opts.data as any
  })
});


// 全局状态配置
export async function getInitialState() {
  return {
    author: 'hocgin',
  };
}
