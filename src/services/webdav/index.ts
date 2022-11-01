import {WebDavData, WebDavInfo} from '@/services/webdav/types';
import Config from '@/config';
import {WebDAVClient} from 'webdav';
import {FileStat, PutFileContentsOptions} from 'webdav/dist/node/types';
import {LangKit} from "@hocgin/hkit";

export default class Index {
  public static Maps: Record<string, WebDavInfo> = {
    '1': new WebDavInfo({
      id: '1',
      remoteUrl: Config.isDev() ? '/dav/' : 'https://dav.jianguoyun.com/dav/',
      title: 'hocgin@gmail.com',
      username: 'hocgin@gmail.com',
      password: 'az9badd6nzagxdxc',
      rootDir: '/我的坚果云',
    }),
    '2': new WebDavInfo({
      id: '2',
      remoteUrl: Config.isDev() ? '/dav/' : 'https://dav.jianguoyun.com/dav/',
      title: 'hocgin2@gmail.com',
      username: 'hocgin2@gmail.com',
      password: 'az9badd6nzagxdxc',
      rootDir: '/我的坚果云',
    } as WebDavData),
    '3': new WebDavInfo({
      id: '3',
      remoteUrl: Config.isDev() ? '/dav/' : 'https://dav.jianguoyun.com/dav/',
      title: 'hocgin3@gmail.com',
      username: 'hocgin3@gmail.com',
      password: 'az9badd6nzagxdxc',
      rootDir: '/我的坚果云',
    }),
    '4': new WebDavInfo({
      id: '4',
      remoteUrl: Config.isDev() ? '/dav/' : 'https://dav.jianguoyun.com/dav/',
      title: 'hocgin4@gmail.com',
      username: 'hocgin4@gmail.com',
      password: 'az9badd6nzagxdxc',
      rootDir: '/我的坚果云',
    }),
    '5': new WebDavInfo({
      id: '5',
      remoteUrl: Config.isDev() ? '/dav/' : 'https://dav.jianguoyun.com/dav/',
      title: 'hocgin5@gmail.com',
      username: 'hocgin5@gmail.com',
      password: 'az9badd6nzagxdxc',
      rootDir: '/我的坚果云',
    }),
  };

  static getInfo(id: string): WebDavInfo {
    return Index.Maps[id] as WebDavInfo;
  }

  static getClient(id: string): WebDAVClient {
    return this.getInfo(id).getClient();
  }

  static async getDirectoryContents(
    id: string,
    path: string,
  ): Promise<FileStat[]> {
    return this.getClient(id).getDirectoryContents(path) as any;
  }

  static async getRootContents(id: string): Promise<FileStat[]> {
    return this.getInfo(id).getRootContents();
  }

  static async putFileContents(id: string, filename: string, file: File, options: PutFileContentsOptions = {}) {
    let client = this.getClient(id);
    // todo 目前库不支持浏览器端的Stream, 等待其切换为 fetch。
    // link issues https://github.com/perry-mitchell/webdav-client/issues/292
    // file.stream().pipe(client.createWriteStream(filename, options));
    await client.putFileContents(filename, await file.text(), options);
  }

  static async exists(id: string, path: string) {
    return this.getClient(id).exists(path);
  }

  static async deleteFile(id: string, path: string) {
    return this.getClient(id).deleteFile(path);
  }

  static async createDirectory(id: string, path: string) {
    return this.getClient(id).createDirectory(path);
  }

  static destroy(id: string) {
    this.getInfo(id).destroy();
  }

  static async get(id: string): Promise<WebDavData> {
    return Index.Maps[id].asWebDavData();
  }


  static async save(data: WebDavData): Promise<WebDavData> {
    let id = data.id;
    if (id) {
      data = LangKit.merge(Index.get(id), data)
    } else {
      id = String(new Date().getTime());
      data.id = id;
    }
    return Index.Maps[id] = new WebDavInfo(data);
  }

  static async list(): Promise<WebDavData[]> {
    let webDavInfos = Object.values(Index.Maps);
    return webDavInfos.map((data) => data.asWebDavData());
  }

  static async remove(id: string) {
    delete Index.Maps[id]
  }
}
