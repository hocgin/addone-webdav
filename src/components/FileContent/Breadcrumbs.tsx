import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { WebDavEventType } from '@/_utils/types';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import Utils from '@/_utils/utils';

const Index: React.FC<{
  webDav$: EventEmitter<WebDavEventType>;
  className?: string;
  base?: string;
  current?: string;
}> = ({ webDav$, base = '/', current = '/' }) => {
  let currentPaths = Utils.splitPath(current);
  let basePaths = Utils.splitPath(base);
  let openDirectory = (path: string) =>
    webDav$.emit({ type: `open.directory` as any, value: path });
  return (
    <Breadcrumb>
      <Breadcrumb.Item href={`#/`} onClick={() => openDirectory(base)}>
        <HomeOutlined />
      </Breadcrumb.Item>
      {currentPaths.map((title, index) => (
        <Breadcrumb.Item
          href={`#${title}`}
          onClick={() => {
            if (index + 1 <= basePaths.length) {
              openDirectory(base);
              return;
            }
            openDirectory(`/${currentPaths.slice(0, index + 1).join('/')}`);
          }}
        >
          <span>{title}</span>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Index;
