import { WebDAVClient } from 'webdav';
import * as WebDav from 'webdav/web';
import { FileStat } from 'webdav/dist/node/types';

export interface WebDavData {
  // id
  id: string;
  // 标题
  title: string;
  // 服务商: 坚果云
  service?: string;
  // 授权类型
  auth?: WebDavAuthType;
  // webdav 服务地址
  remoteUrl: string;
  // digest.username
  username?: string;
  // digest.password
  password?: string;
  // 根目录
  rootDir: string;
}

export enum WebDavServiceType {
  custom = 'custom',
  jianguoyun = 'jianguoyun',
}

export enum WebDavAuthType {
  digest = 'digest',
  basic = 'basic',
  token = 'token',
}

export class WebDavInfo implements WebDavData {
  public title: string;
  public id: string;
  public remoteUrl: string;
  public auth?: WebDavAuthType = WebDavAuthType.digest;
  public service?: string = WebDavServiceType.custom;
  public username?: string;
  public password?: string;
  public rootDir: string = '/';
  private client?: WebDAVClient;

  constructor(data: WebDavData) {
    this.id = data.id;
    if (data.auth) {
      this.auth = data.auth;
    }
    if (data.service) {
      this.service = data.service;
    }
    this.remoteUrl = data.remoteUrl;
    this.title = data.title;
    this.username = data.username;
    this.password = data.password;
    if (data.rootDir) {
      this.rootDir = data.rootDir;
    }
  }

  public getClient(): WebDAVClient {
    if (!this.client) {
      this.client = WebDav.createClient(this.remoteUrl, {
        username: this.username,
        password: this.password,
      });
    }
    return this.client;
  }

  public async getRootContents(): Promise<FileStat[] | any> {
    return this.getClient().getDirectoryContents(this.rootDir);
  }

  public destroy() {
    //this.client?.destroy?.();
    delete this.client;
  }

  public asWebDavData() {
    return {
      ...this,
      client: undefined,
    } as WebDavData;
  }
}
