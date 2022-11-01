import { Container } from '@/components';
import React, { useEffect, useRef, useState } from 'react';
import WebDavService from '@/services/webdav';
import { Layout, Menu } from 'antd';
import { useBoolean, useRequest } from 'ahooks';
import { WebDavData } from '@/services/webdav/types';
import FileContent from '@/components/FileContent';
import styles from './index.less';
import AccountButton from '@/components/FileContent/AccountButton';
import SaveAccount from '@/components/FileContent/SaveAccount';
import SaveModal from '@/components/FileContent/SaveAccount/SaveModal';

const { Header, Footer, Sider, Content } = Layout;

const Index = () => {
  let [webDav, setWebDav] = useState<WebDavData[]>([]);
  let [activeId, setActiveId] = useState<string | undefined>();
  let [editId, setEditId] = useState<string | undefined>(undefined);
  let $list = useRequest(WebDavService.list, {
    onSuccess: (data) => {
      setWebDav(data);
      if (
        data.length &&
        (!activeId ||
          (activeId && !data.map(({ id }) => id).includes(activeId)))
      ) {
        setActiveId(data[0].id);
      }
    },
  });
  let $remove = useRequest(WebDavService.remove, {
    manual: true,
    onSuccess: $list.run,
  });

  console.log('webDav', webDav, activeId);
  return (
    <Container className={styles.container}>
      <Layout className={styles.layout}>
        <Sider className={styles.sider}>
          <div className={styles.siderHeader}>
            <SaveAccount onOk={() => $list.runAsync()}>新增</SaveAccount>
          </div>
          <Menu
            mode="inline"
            items={webDav.map(({ id, username }) => ({
              key: id,
              label: (
                <AccountButton
                  id={id}
                  onEdit={setEditId}
                  onRemove={() => $remove.runAsync(id)}
                >
                  {username}
                </AccountButton>
              ),
            }))}
          />
        </Sider>
        <FileContent clientId={activeId} />
      </Layout>
      <SaveModal
        id={editId}
        visible={editId as any}
        onCancel={setEditId.bind(this, undefined)}
        onOk={() => $list.runAsync()}
      />
    </Container>
  );
};
export default Index;
