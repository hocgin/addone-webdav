import React from 'react';
import {Dropdown, Menu, Modal} from 'antd';
import {DownOutlined} from '@ant-design/icons';

const Index: React.FC<{
  className?: string;
  children?: string;
  id: string;
  onRemove?: () => void;
  onEdit?: (id: string) => void;
}> = ({id, onEdit, children, onRemove}) => {
  return (
    <Dropdown.Button
      type="link"
      overlay={
        <Menu
          items={[
            {
              key: 'edit',
              label: (
                <a target="_blank" rel="noopener noreferrer" onClick={() => onEdit?.(id)}>
                  修改
                </a>
              ),
            },
            {
              key: 'delete',
              label: (
                <a target="_blank" rel="noopener noreferrer" onClick={() => Modal.confirm({
                  title: `确认删除账号`,
                  onOk: onRemove,
                })}>删除</a>
              ),
            },
          ]}
        />
      }
      icon={<DownOutlined />}
      trigger={['click']}
    >
      {children}
    </Dropdown.Button>
  );
};

export default Index;
