import React from 'react';
import {Select} from 'antd';
import {Empty} from '@hocgin/ui';
import {I18nKit} from '@hocgin/browser-addone-kit';

export const Search: React.FC<{
  className?: string;
}> = (props) => {
  return (
    <Select
      showSearch
      allowClear
      style={{width: 200}}
      placeholder={I18nKit.getMessageOrDefault(`search_placeholder` as any)}
      defaultActiveFirstOption={false}
      filterOption={false}
      notFoundContent={<Empty/>}
      options={[
        {
          value: 'empty',
          label: '暂不支持搜索',
        },
      ] as any}
    />
  );
};
