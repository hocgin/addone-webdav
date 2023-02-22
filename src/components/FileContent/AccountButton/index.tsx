import React from 'react';
import { App, Dropdown, Menu, Modal } from 'antd';
import { DownOutlined, CloudServerOutlined } from '@ant-design/icons';
import styles from './index.less';
import { I18nKit } from '@hocgin/browser-addone-kit';

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
                {I18nKit.getMessageOrDefault('modify' as any)}
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
                    title: I18nKit.getMessageOrDefault('confirm_del_account' as any),
                    onOk: onRemove,
                  })
                }
              >
                {I18nKit.getMessageOrDefault('del' as any)}
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
