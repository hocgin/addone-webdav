import React from 'react';
import {Tag} from 'antd';
import {PlatformKit} from "@hocgin/hkit";
import {WebExtension} from "@hocgin/browser-addone-kit";

export const StoreLink: React.FC<{
  className?: string;
}> = (props) => {
  let url = PlatformKit.isEdge ? 'https://microsoftedge.microsoft.com/addons/search/hocgin' : 'https://chrome.google.com/webstore/search/hocgin';
  return <Tag color='#D25643' style={{cursor: 'pointer'}}
              onClick={() => WebExtension.tabs.create({url: url})}>推荐</Tag>;
};

