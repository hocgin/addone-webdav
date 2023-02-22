import React from 'react';
import {Tag} from 'antd';
import {i18nKit, WebExtension} from '@hocgin/browser-addone-kit';

export const StoreLink: React.FC<{
  className?: string;
}> = (props) => {
  return (
    <Tag
      color="#D25643"
      style={{cursor: 'pointer'}}
      onClick={WebExtension.kit.openRecommendURL}
    >
      {i18nKit.getMessage('recommend' as any)}
    </Tag>
  );
};
