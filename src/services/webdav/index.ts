import { WebDavData, WebDavInfo } from '@/services/webdav/types';
import { WebDAVClient } from 'webdav';
import { FileStat, PutFileContentsOptions } from 'webdav/dist/node/types';
import { LangKit } from '@hocgin/hkit';
import { loadAccount, saveAccount } from '@/_utils/storage';

export default class Index {
  public static Maps: Record<string, WebDavInfo> = {};

  static async reload() {
    let maps: Record<string, WebDavInfo> = {};
    (await loadAccount()).forEach(
      (data) => (maps[data.id] = new WebDavInfo(data)),
    );
    Index.Maps = maps;
  }

  static async saveAll() {
    await saveAccount(Object.values(Index.Maps).map((d) => d.asWebDavData()));
  }

  static async getMaps(): Promise<Record<string, WebDavInfo>> {
    if (!Object.keys(Index.Maps).length) {
      await Index.reload();
    }
    return Index.Maps;
  }

  static async getInfo(id: string): Promise<WebDavInfo> {
    return (await Index.getMaps())[id] as WebDavInfo;
  }

  static async getClient(id: string): Promise<WebDAVClient> {
    return (await Index.getInfo(id)).getClient();
  }

  static async getDirectoryContents(
    id: string,
    path: string,
  ): Promise<FileStat[]> {
    return (await (
      await Index.getClient(id)
    ).getDirectoryContents(path)) as any;
  }

  static async getRootContents(id: string): Promise<FileStat[]> {
    return (await Index.getInfo(id)).getRootContents();
  }

  static async putFileContents(
    id: string,
    filename: string,
    file: File,
    options: PutFileContentsOptions = {},
  ) {
    let client = await Index.getClient(id);
    // todo 目前库不支持浏览器端的Stream, 等待其切换为 fetch。
    // link issues https://github.com/perry-mitchell/webdav-client/issues/292
    // file.stream().pipe(client.createWriteStream(filename, options));
    await client.putFileContents(filename, await file.arrayBuffer(), options);
  }

  static async exists(id: string, path: string) {
    let client = await Index.getClient(id);
    return client.exists(path);
  }

  static async deleteFile(id: string, path: string) {
    let client = await Index.getClient(id);
    return client.deleteFile(path);
  }

  static async getFileDownloadLink(id: string, path: string) {
    let client = await Index.getClient(id);
    return client.getFileDownloadLink(path);
  }

  static async moveFile(id: string, fpath: string, tpath: string) {
    let client = await Index.getClient(id);
    return client.moveFile(fpath, tpath);
  }

  static async createDirectory(id: string, path: string) {
    let client = await Index.getClient(id);
    return client.createDirectory(path);
  }

  static async getFileContents(id: string, path: string): Promise<Buffer> {
    let client = await Index.getClient(id);
    return client.getFileContents(path) as any;
  }

  static async destroy(id: string) {
    (await Index.getInfo(id)).destroy();
  }

  static async get(id: string): Promise<WebDavData> {
    return (await Index.getMaps())[id].asWebDavData();
  }

  static async list(): Promise<WebDavData[]> {
    return Object.values(await Index.getMaps()).map((data) =>
      data.asWebDavData(),
    );
  }

  static async save(data: WebDavData): Promise<WebDavData> {
    let id = data.id;
    if (id) {
      data = LangKit.merge((await Index.get(id)) ?? {}, data);
    } else {
      id = String(new Date().getTime());
      data.id = id;
    }
    let result = (Index.Maps[id] = new WebDavInfo(data));
    await Index.saveAll();
    return result;
  }

  static async remove(id: string) {
    delete Index.Maps[id];
    await Index.saveAll();
  }
}
