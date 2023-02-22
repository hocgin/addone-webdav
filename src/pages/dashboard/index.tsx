import { Container, StoreLink } from '@/components';
import React, { useState } from 'react';
import WebDavService from '@/services/webdav';
import { Layout, Menu, Image, Popover, Space } from 'antd';
import { useRequest } from 'ahooks';
import { QrcodeOutlined } from '@ant-design/icons';
import { WebDavData } from '@/services/webdav/types';
import FileContent from '@/components/FileContent';
import styles from './index.less';
import AccountButton from '@/components/FileContent/AccountButton';
import SaveAccount from '@/components/FileContent/SaveAccount';
import SaveModal from '@/components/FileContent/SaveAccount/SaveModal';
import { Empty } from '@/components';
import SettingButton from '@/pages/dashboard/SettingButton';
import { I18nKit } from '@hocgin/browser-addone-kit';

const { Sider } = Layout;

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
      } else if (!data.length) {
        setActiveId(undefined);
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
        <Sider theme={'light'} className={styles.sider}>
          <div className={styles.siderHeader}>
            <SaveAccount onOk={() => $list.runAsync()}>
              {I18nKit.getMessageOrDefault('add' as any)}
            </SaveAccount>
          </div>
          <div className={styles.siderMenu}>
            {webDav.length ? (
              <Menu
                onClick={({ key }) => setActiveId(key)}
                mode="inline"
                items={webDav.map(({ id, username, title }) => ({
                  key: id,
                  label: (
                    <AccountButton
                      id={id}
                      onEdit={setEditId}
                      onRemove={() => $remove.runAsync(id)}
                      remark={username}
                    >
                      {title}
                    </AccountButton>
                  ),
                }))}
              />
            ) : (
              <Empty
                className={styles.empty}
                description={I18nKit.getMessageOrDefault('no_account' as any)}
              />
            )}
          </div>
          <Space className={styles.siderTool}>
            <Space>
              <Popover
                content={
                  <>
                    <Image
                      src="https://cdn.hocgin.top/uPic/mp-logo.jpg"
                      width={80}
                      alt={I18nKit.getMessageOrDefault(`wx_qrcode` as any)}
                    />
                  </>
                }
              >
                <QrcodeOutlined />
              </Popover>
              <SettingButton />
            </Space>
            <StoreLink />
          </Space>
        </Sider>
        <FileContent clientId={activeId} />
      </Layout>
      <SaveModal
        id={editId}
        visible={editId as any}
        onCancel={setEditId.bind(this, undefined as any)}
        onOk={() => $list.runAsync()}
      />
    </Container>
  );
};
export default Index;
