import React, { useEffect, useRef, useState } from 'react';
import { DownloadOutlined, HomeOutlined } from '@ant-design/icons';
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
import { useAsyncEffect, useEventEmitter } from 'ahooks';
import { FileStat } from 'webdav/dist/node/types';
import styles from './index.less';
import { WebDavEventType } from '@/_utils/types';
import { WebDavInfo } from '@/services/webdav/types';
import CreateDirectory from '@/components/FileContent/CreateDirectory';
import UploadFile from '@/components/FileContent/UploadFile';
import { RcFile } from 'antd/lib/upload/interface';
import { Empty } from '@hocgin/ui';
import { WebExtension } from '@hocgin/browser-addone-kit';
import { FileViewModal } from '@/components/FileView';

const { Header, Footer, Sider, Content } = Layout;

const Index: React.FC<{
  className?: string;
  rowColumn?: number;
  clientId?: string;
  getInstance?: (_: any) => void;
}> = ({ clientId, rowColumn = 12 }) => {
  console.log('clientId', clientId);
  let [webDavInfo, setWebDavInfo] = useState<WebDavInfo>();
  let [currentPath, setCurrentPath] = useState<string>();
  let [datasource, setDatasource] = useState<FileStat[]>([]);
  let [previewFilename, setPreviewFilename] = useState<string | undefined>(
    undefined,
  );
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
    // 打开文件
    else if (event.type === 'open.file' && currentPath != event.value) {
      let url = await WebDavService.getFileDownloadLink(clientId!, event.value);
      window.open(url);
    }
    // 浏览文件
    else if (event.type === 'preview.file' && currentPath != event.value) {
      setPreviewFilename(event.value);
    }
    // 创建目录
    else if (event.type === 'create.directory') {
      let directory = `${currentPath}/${event.value}`;
      if (await WebDavService.exists(clientId!, directory)) {
        message.error('文件夹已经存在');
      } else {
        await WebDavService.createDirectory(clientId!, directory);
        webDav$.emit({ type: 'refresh.directory' });
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
        await WebDavService.putFileContents(clientId!, filename, file, {
          overwrite: true,
        });
        webDav$.emit({ type: 'refresh.directory' });
      }
    }
    // 删除选中的文件
    else if (event.type === 'delete.file' && event.value) {
      await WebDavService.deleteFile(clientId!, event.value);
      webDav$.emit({ type: 'refresh.directory' });
    }
    // 下载选中的文件
    else if (event.type === 'download.file' && event.value) {
      let url = await WebDavService.getFileDownloadLink(clientId!, event.value);
      WebExtension.downloads.download({ url });
    }
    // 下载选中的目录
    else if (event.type === 'download.directory' && event.value) {
      let url = await WebDavService.getFileDownloadLink(clientId!, event.value);
      WebExtension.downloads.download({ url });
    }
    // 其他
    else {
      console.warn('未匹配到指令', event);
      message.warn(`操作失败: ${event.type}`);
    }
  });
  useAsyncEffect(async () => {
    if (!clientId) {
      return;
    }
    let info = await WebDavService.getInfo(clientId);
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
            <Radio.Button value="default" disabled>
              新建在线文档
            </Radio.Button>
            <Radio.Button value="small" disabled>
              离线下载
            </Radio.Button>
          </Radio.Group>
        </Space>
      </Header>
      <Content className={styles.content}>
        {clientId ? (
          <>
            <Breadcrumbs
              webDav$={webDav$}
              base={webDavInfo?.rootDir}
              current={currentPath}
            />
            {datasource.length ? (
              <>
                {Utils.chunk(datasource, rowColumn).map((colData = []) => (
                  <Row>
                    {colData.map((data) => (
                      <Col span={rowSpan}>
                        <FileItem
                          webDav$={webDav$}
                          data={data}
                          onClick={({ filename, type }) => {
                            if (type === 'file') {
                              webDav$.emit({
                                type: `preview.${type}` as any,
                                value: filename,
                              });
                              return;
                            }
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
              </>
            ) : (
              <>
                <Empty description="空" />
              </>
            )}
          </>
        ) : (
          <Empty description="未添加账号" />
        )}
      </Content>
      <FileViewModal
        clientId={clientId}
        onCancel={() => setPreviewFilename(undefined)}
        visible={!!previewFilename}
        filename={previewFilename}
      />
      {/*<Footer>Footer</Footer>*/}
    </Layout>
  );
};

export default Index;
