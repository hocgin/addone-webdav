import React from 'react';
import { App, Dropdown, Menu, Modal } from 'antd';
import { DownOutlined, CloudServerOutlined } from '@ant-design/icons';
import styles from './index.less';
import { i18nKit } from '@hocgin/browser-addone-kit';

const Index: React.FC<{
  className?: string;
  children?: string;
  id: string;
  remark?: string;
  onRemove?: () => void;
  onEdit?: (id: string) => void;
}> = ({ id, remark, onEdit, children, onRemove }) => {
  let { modal } = App.useApp();
  return (
    <Dropdown.Button
      type="text"
      menu={{
        items: [
          {
            key: 'edit',
            label: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onEdit?.(id)}
              >
                {i18nKit.getMessage('modify' as any)}
              </a>
            ),
          },
          {
            key: 'delete',
            label: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  modal.confirm({
                    title: i18nKit.getMessage('confirm_del_account' as any),
                    onOk: onRemove,
                  })
                }
              >
                {i18nKit.getMessage('del' as any)}
              </a>
            ),
          },
        ],
      }}
      icon={<DownOutlined />}
      className={styles.btn}
      trigger={['click']}
    >
      <CloudServerOutlined style={{ fontSize: 20 }} /> {children}
    </Dropdown.Button>
  );
};

export default Index;
