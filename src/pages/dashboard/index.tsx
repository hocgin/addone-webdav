import {Container} from '@/components';
import {WebExtension} from '@hocgin/browser-addone-kit';
import React, {useEffect, useRef, useState} from "react";
import WebDavService from '@/services/webdav';


const Index: React.FC<{
  getInstance?: (_: any) => void;
}> = ({getInstance}) => {
  let [data, setData] = useState<any>({});


  const _webdavRef = useRef<any>(null);
  useEffect(() => {
    let webDavInfo = WebDavService.get('1');
    _webdavRef.current = webDavInfo.getClient();

    if (getInstance && typeof getInstance === 'function') {
      getInstance(_webdavRef.current);
    }

    webDavInfo.getRootContents().then(setData);
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
