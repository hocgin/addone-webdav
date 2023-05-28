import React from 'react';
import {WebExtension} from '@hocgin/browser-addone-kit';
import {HeartTwoTone} from '@ant-design/icons';


export const StoreLink: React.FC<{}> = () => {
  return (<HeartTwoTone twoToneColor="#eb2f96" onClick={WebExtension.kit.openRecommendURL}/>)
};
