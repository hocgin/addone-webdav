import {WebDavInfo} from "@/services/webdav/types";


export default class {
  static Maps: Record<string, WebDavInfo> = {
    "1": new WebDavInfo({
      remoteUrl: 'https://dav.jianguoyun.com/dav/',
      username: 'hocgin@gmail.com',
      password: 'az9badd6nzagxdxc',
      rootDir: '/我的坚果云'
    }),
  };

  static get(id: string) {
    return this.Maps[id];
  }

}
