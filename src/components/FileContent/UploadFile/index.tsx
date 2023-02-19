import * as React from 'react';
import { Dropdown, Menu } from 'antd';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { WebDavEventType } from '@/_utils/types';
import { UploadOutlined } from '@ant-design/icons';
import UploadButton from '@/components/FileContent/UploadFile/UploadButton';
import styles from './index.less';
import { i18nKit } from '@hocgin/browser-addone-kit';

const Index: React.FC<{
  children?: any;
  disabled?: boolean;
  webDav$: EventEmitter<WebDavEventType>;
}> = ({ children, disabled, webDav$ }) => {
  return (
    <Dropdown.Button
      disabled={disabled}
      menu={{
        items: [
          {
            label: (
              <UploadButton webDav$={webDav$}>
                {i18nKit.getMessage('upload_file' as any)}
              </UploadButton>
            ),
            key: 'file',
          },
          {
            label: (
              <UploadButton webDav$={webDav$} directory={true}>
                {i18nKit.getMessage('upload_dir' as any)}
              </UploadButton>
            ),
            key: 'directory',
          },
        ],
      }}
      type="primary"
    >
      <UploadButton webDav$={webDav$} className={styles.uploadButton}>
        <UploadOutlined /> {children}
      </UploadButton>
    </Dropdown.Button>
  );
};

export default Index;
