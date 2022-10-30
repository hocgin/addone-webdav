import {WebDAVClient} from "webdav";
import * as WebDav from "webdav/web";

export interface WebDavOption {
  id?: string;
  remoteUrl: string;
  username: string;
  password: string;
  rootDir?: string;
}

export enum WebDavType {

}

export class WebDavInfo {
  private id: string;
  private remoteUrl: string;
  private username: string;
  private password: string;
  private rootDir: string;
  private client?: WebDAVClient;

  constructor({id, remoteUrl, username, password, rootDir = '/'}: WebDavOption) {
    this.id = id ?? `${remoteUrl}@${username}`;
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

  public async getRootContents() {
    return this.client?.getDirectoryContents(this.rootDir);
  }
}
