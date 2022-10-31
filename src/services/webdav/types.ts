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
  id: string;
  remoteUrl: string;
  username: string;
  password: string;
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
  public id: string;
  public remoteUrl: string;
  public username: string;
  public password: string;
  public rootDir: string;
  private client?: WebDAVClient;

  constructor({id, remoteUrl, username, password, rootDir = '/'}: WebDavOption) {
    this.id = id ?? encodeURIComponent(`${remoteUrl}@${username}`);
    this.remoteUrl = remoteUrl;
    this.username = username;
    this.password = password;
    this.rootDir = rootDir;
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
}
