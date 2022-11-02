import React from 'react';
import { Select } from 'antd';
import { Empty } from '@hocgin/ui';

export const Search: React.FC<{
  className?: string;
}> = (props) => {
  return (
    <Select
      showSearch
      allowClear
      style={{ width: 200 }}
      placeholder={'搜索..'}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      notFoundContent={<Empty />}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
      ]}
    />
  );
};
