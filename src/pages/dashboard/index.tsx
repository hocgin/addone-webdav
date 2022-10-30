import {Container} from '@/components';
import {WebExtension} from '@hocgin/browser-addone-kit';
import React, {useEffect, useRef, useState} from "react";
import * as WebDav from "webdav/web";


const Index: React.FC<{
  getInstance?: (_: any) => void;
}> = ({getInstance}) => {
  let [data, setData] = useState<any>({});

  const _webdavRef = useRef<any>(null);
  useEffect(() => {
    console.log('WebDav', WebDav);
    let client = WebDav.createClient("https://dav.jianguoyun.com/dav/", {
      username: 'hocgin@gmail.com',
      password: 'az9badd6nzagxdxc',
    });
    _webdavRef.current = client;

    if (getInstance && typeof getInstance === 'function') {
      getInstance(_webdavRef.current);
    }

    client.getDirectoryContents("/我的坚果云").then(setData);
    return () => {
      _webdavRef.current?.destroy();
    };
  }, []);


  let onClickHi = async () => {
    let tab: any = await WebExtension.kit.getCurrentTab();
    WebExtension.tabs.sendMessage(tab.id, {greeting: "hello"}, (response: any) => {
      console.log('获得响应')
    })
  };


  return (
    <Container>
      <h1 onClick={onClickHi}>{JSON.stringify(data)}</h1>
    </Container>
  );
}
export default Index;
