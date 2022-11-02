import {WebDavServiceType, WebDavAuthType} from '@/services/webdav/types';

export let ServiceConfig = [
  {
    id: WebDavServiceType.jianguoyun,
    label: '坚果云',
    remoteUrl: 'https://dav.jianguoyun.com/dav',
    rootDir: '/我的坚果云',
    support_auth: [
      WebDavAuthType.digest,
      WebDavAuthType.password,
      WebDavAuthType.token,
    ],
    urlDoc: {
      title: '坚果云 WebDAV 开启方法',
      imageSrc: 'https://www.jianguoyun.com/favicon.ico',
      description: 'https://help.jianguoyun.com',
      href: 'https://help.jianguoyun.com/?p=2064',
    }
  },
  {
    id: WebDavServiceType.box,
    remoteUrl: 'https://dav.box.com/dav',
    label: 'Box',
    rootDir: '/',
    support_auth: [
      WebDavAuthType.digest,
      WebDavAuthType.password,
      WebDavAuthType.token,
    ],
    urlDoc: {
      title: 'Box WebDav 开启方法',
      imageSrc: 'https://www.box.com/themes/custom/box/favicons/favicon.ico',
      description: 'https://www.box.com',
      href: 'https://support.box.com/hc/en-us/articles/360043696414-WebDAV-with-Box',
    }
  },
  {
    id: WebDavServiceType.nextcloud,
    remoteUrl: 'https://',
    label: 'Box',
    rootDir: '/',
    support_auth: [
      WebDavAuthType.digest,
      WebDavAuthType.password,
      WebDavAuthType.token,
    ],
    urlDoc: {
      title: 'Nextcloud WebDav 开启方法',
      imageSrc: 'https://nextcloud.com/wp-content/uploads/2022/03/favicon.png',
      description: 'https://docs.nextcloud.com',
      href: 'https://docs.nextcloud.com/server/latest/user_manual/en/files/access_webdav.html',
    }
  },
  {
    id: WebDavServiceType.dropbox,
    remoteUrl: 'https://dav.dropdav.com/',
    label: 'Dropbox',
    rootDir: '/',
    support_auth: [
      WebDavAuthType.digest,
      WebDavAuthType.password,
      WebDavAuthType.token,
    ],
    urlDoc: {
      title: 'Dropbox WebDav 开启方法',
      imageSrc: 'https://aem.dropbox.com/cms/content/dam/dropbox/aem/favicon32.ico',
      description: 'https://www.dropbox.com/',
      href: 'https://help.dropbox.com/integrations/webdav-or-ftp',
    }
  },
  {
    id: WebDavServiceType.custom,
    label: '自定义',
    rootDir: '/',
    support_auth: [
      WebDavAuthType.digest,
      WebDavAuthType.password,
      WebDavAuthType.token,
    ],
    urlDoc: {
      title: '参考文档',
      imageSrc: 'https://cdn.hocgin.top/uPic/favicon.ico',
      description: 'https://www.hocgin.top/webdav/doc.html',
      href: 'https://www.hocgin.top/webdav/doc.html',
    }
  },
];

export function getConfig(value: string) {
  return ServiceConfig.find(({id}) => id === value);
}
