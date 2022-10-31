import React, {useEffect, useRef, useState} from 'react';
import {DownloadOutlined, HomeOutlined} from '@ant-design/icons';
import {
  Layout,
  Row,
  Col,
  Button,
  Radio,
  Space,
  Breadcrumb,
  message,
} from 'antd';
import Utils from '@/_utils/utils';
import Breadcrumbs from '@/components/FileContent/Breadcrumbs';
import FileItem from '@/components/FileContent/FileItem';
import WebDavService from '@/services/webdav';
import {useAsyncEffect, useEventEmitter} from 'ahooks';
import {FileStat} from 'webdav/dist/node/types';
import styles from './index.less';
import {WebDavEventType} from '@/_utils/types';
import {WebDavInfo} from '@/services/webdav/types';
import CreateDirectory from '@/components/FileContent/CreateDirectory';
import UploadFile from "@/components/FileContent/UploadFile";
import {RcFile} from "antd/lib/upload/interface";

const {Header, Footer, Sider, Content} = Layout;

const Index: React.FC<{
  className?: string;
  rowColumn?: number;
  clientId?: string;
  getInstance?: (_: any) => void;
}> = ({clientId, rowColumn = 12}) => {
  console.log('clientId', clientId);
  let [webDavInfo, setWebDavInfo] = useState<WebDavInfo>();
  let [currentPath, setCurrentPath] = useState<string>();
  let [datasource, setDatasource] = useState<FileStat[]>([]);
  let rowSpan = 24 / rowColumn;
  const webDav$ = useEventEmitter<WebDavEventType>();
  webDav$.useSubscription(async (event: WebDavEventType) => {
    console.log('收到指令', event);
    // 打开目录
    if (event.type === 'open.directory' && currentPath != event.value) {
      setDatasource(
        await WebDavService.getDirectoryContents(clientId!, event.value),
      );
      setCurrentPath(event.value);
    }
    // 创建目录
    else if (event.type === 'create.directory') {
      let directory = `${currentPath}/${event.value}`;
      if (await WebDavService.exists(clientId!, directory)) {
        message.error('文件夹已经存在');
      } else {
        await WebDavService.createDirectory(clientId!, directory);
        webDav$.emit({type: 'refresh.directory'});
      }
    }
    // 刷新当前目录
    else if (event.type === 'refresh.directory' && currentPath) {
      setDatasource(
        await WebDavService.getDirectoryContents(clientId!, currentPath),
      );
    }
    // 上传文件
    else if (event.type === 'upload.file' && event.value) {
      let file = event.value as RcFile;
      let filename = `${currentPath}/${file.name}`;
      console.log('文件', filename);
      if (await WebDavService.exists(clientId!, filename)) {
        message.error('文件已经存在');
      } else {
        await WebDavService.putFileContents(clientId!, filename, file, {overwrite: true})
        webDav$.emit({type: 'refresh.directory'});
      }
    }
    // 删除选中的文件
    else if (event.type === 'delete.file' && event.value) {
      await WebDavService.deleteFile(clientId!, event.value);
      webDav$.emit({type: 'refresh.directory'});
    }
    // 其他
    else {
      console.warn('未匹配到指令', event);
    }
  });
  useAsyncEffect(async () => {
    if (!clientId) {
      return;
    }
    let info = WebDavService.getInfo(clientId);
    setWebDavInfo(info);
    setDatasource(await WebDavService.getRootContents(clientId));
    setCurrentPath(info.rootDir);
  }, [clientId]);

  return (
    <Layout>
      <Header className={styles.header}>
        <Space direction={'horizontal'}>
          <UploadFile webDav$={webDav$}>上传</UploadFile>
          <Radio.Group>
            <CreateDirectory webDav$={webDav$}>新建文件夹</CreateDirectory>
            <Radio.Button value="default">新建在线文档</Radio.Button>
            <Radio.Button value="small">离线下载</Radio.Button>
          </Radio.Group>
        </Space>
      </Header>
      <Content className={styles.content}>
        <Breadcrumbs
          webDav$={webDav$}
          base={webDavInfo?.rootDir}
          current={currentPath}
        />
        {Utils.chunk(datasource, rowColumn).map((colData = []) => (
          <Row>
            {colData.map((data) => (
              <Col span={rowSpan}>
                <FileItem
                  webDav$={webDav$}
                  data={data}
                  onClick={({filename, type}) => {
                    webDav$.emit({
                      type: `open.${type}` as any,
                      value: filename,
                    });
                  }}
                />
              </Col>
            ))}
          </Row>
        ))}
      </Content>
      {/*<Footer>Footer</Footer>*/}
    </Layout>
  );
};

export default Index;
