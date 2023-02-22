import React from 'react';
import {Tag} from 'antd';
import {I18nKit, WebExtension} from '@hocgin/browser-addone-kit';

export const StoreLink: React.FC<{
  className?: string;
}> = (props) => {
  return (
    <Tag
      color="#D25643"
      style={{cursor: 'pointer'}}
      onClick={WebExtension.kit.openRecommendURL}
    >
      {I18nKit.getMessageOrDefault('recommend' as any)}
    </Tag>
  );
};
