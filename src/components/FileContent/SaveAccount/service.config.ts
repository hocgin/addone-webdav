import { WebDavServiceType, WebDavAuthType } from '@/services/webdav/types';

export let ServiceConfig = [
  {
    id: WebDavServiceType.jianguoyun,
    label: '坚果云',
    remoteUrl: 'https://dav.jianguoyun.com',
    rootDir: '/我的坚果云',
    support_auth: [
      WebDavAuthType.digest,
      WebDavAuthType.basic,
      WebDavAuthType.token,
    ],
  },
  {
    id: WebDavServiceType.custom,
    label: '自定义',
    rootDir: '/',
    support_auth: [
      WebDavAuthType.digest,
      WebDavAuthType.basic,
      WebDavAuthType.token,
    ],
  },
];

export function getConfig(value: string) {
  return ServiceConfig.find(({ id }) => id === value);
}
