import { Container } from '@/components';
import React, { useEffect, useRef, useState } from 'react';
import WebDavService from '@/services/webdav';
import { Button, Layout, Menu, Dropdown } from 'antd';
import { useRequest } from 'ahooks';
import { WebDavData } from '@/services/webdav/types';
import FileContent from '@/components/FileContent';
import styles from './index.less';

const { Header, Footer, Sider, Content } = Layout;

const Index: React.FC<{
  getInstance?: (_: any) => void;
}> = ({ getInstance }) => {
  let [webDav, setWebDav] = useState<WebDavData[]>([]);
  let [activeId, setActiveId] = useState<string | undefined>();
  useRequest(WebDavService.list, {
    onSuccess: (data) => {
      setWebDav(data);
      if (data.length && !activeId) {
        setActiveId(data[0].id);
      }
    },
  });
  console.log('webDav', webDav, activeId);
  return (
    <Container className={styles.container}>
      <Layout className={styles.layout}>
        <Sider className={styles.sider}>
          <div className={styles.siderHeader}>
            <Button type="primary" block>
              新增账号
            </Button>
          </div>
          <Menu
            mode="inline"
            items={webDav.map(({ id, username }) => ({
              key: id,
              label: username,
            }))}
          />
        </Sider>
        <FileContent clientId={activeId} />
      </Layout>
    </Container>
  );
};
export default Index;
