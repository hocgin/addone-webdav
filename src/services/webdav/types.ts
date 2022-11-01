import {WebDAVClient} from "webdav";
import * as WebDav from "webdav/web";
import {FileStat} from "webdav/dist/node/types";

export interface WebDavOption {
  id?: string;
  remoteUrl: string;
  username: string;
  password: string;
  rootDir?: string;
}

export enum WebDavType {

}

export interface WebDavData {
  // id
  id: string;
  // 标题
  title: string;
  // 服务商: 坚果云
  service?: string;
  // 授权类型
  auth?: 'digest' | 'basic' | 'token';
  // webdav 服务地址
  remoteUrl: string;
  // digest.username
  username?: string;
  // digest.password
  password?: string;
  // 根目录
  rootDir: string;
}

export interface WebDavFile {
  filename: string,
  basename: string,
  lastmod: string,
  size: number,
  type: 'directory' | 'file',
  etag?: string,
  mime?: string,
}

export class WebDavInfo implements WebDavData {
  public title: string;
  public id: string;
  public remoteUrl: string;
  public auth?: "digest" | "basic" | "token";
  public service?: string;
  public username?: string;
  public password?: string;
  public rootDir: string;
  private client?: WebDAVClient;

  constructor(data: WebDavData) {
    this.id = data.id;
    this.auth = data.auth || 'digest';
    this.service = data.service || 'custom';
    this.remoteUrl = data.remoteUrl;
    this.title = data.title;
    this.username = data.username;
    this.password = data.password;
    this.rootDir = data.rootDir || '/';
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
    return ({
      id: this.id,
      remoteUrl: this.remoteUrl,
      username: this.username,
      password: this.password,
      rootDir: this.rootDir,
    } as WebDavData);
  }
}
