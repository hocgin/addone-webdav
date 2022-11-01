import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Index: React.FC<{
  className?: string;
  children?: string;
}> = ({ children }) => {
  return (
    <Dropdown.Button
      type="link"
      overlay={
        <Menu
          items={[
            {
              key: 'edit',
              label: (
                <a target="_blank" rel="noopener noreferrer">
                  修改
                </a>
              ),
            },
            {
              key: 'delete',
              label: (
                <a target="_blank" rel="noopener noreferrer">
                  删除
                </a>
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
