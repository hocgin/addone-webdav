import React, {useRef} from 'react';
import {Breadcrumb} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import {WebDavEventType} from '@/_utils/types';
import {EventEmitter} from 'ahooks/lib/useEventEmitter';
import Utils from '@/_utils/utils';
import {useBoolean, useDrop} from "ahooks";
import {FileStat} from "webdav/dist/node/types";
import classnames from "classnames";
import styles from "./index.less";

const BreadcrumbItem: React.FC<{
  webDav$: EventEmitter<WebDavEventType>;
  filename: string;
  className?: string;
  onClick?: () => void;
  href?: string;
  children?: any;
}> = ({filename, children, webDav$, onClick, href}) => {
  let ref = useRef<any>();
  let [moved, {set: setMoved}] = useBoolean(false);
  useDrop(ref, {
    onDom: (aData: FileStat, e) => {
      webDav$.emit({
        type: `move.${aData.type}`,
        value: {
          from: aData.filename,
          to: `${filename}/${aData.basename}`,
        },
      });
      setMoved(false);
    },
    onDragEnter: () => setMoved(true),
    onDragLeave: () => setMoved(false),
  });
  return <Breadcrumb.Item href={href} onClick={onClick}>
    <span ref={ref} className={classnames(styles.a, {
      [styles.moved]: moved,
    })}>
      {children}
    </span>
  </Breadcrumb.Item>
};

const Index: React.FC<{
  webDav$: EventEmitter<WebDavEventType>;
  className?: string;
  base?: string;
  current?: string;
}> = ({webDav$, base = '/', current = '/'}) => {
  let currentPaths = Utils.splitPath(current);
  let basePaths = Utils.splitPath(base);
  let openDirectory = (path: string) => webDav$.emit({type: `open.directory` as any, value: path});
  console.log('currentPaths', currentPaths);
  return (
    <Breadcrumb>
      <BreadcrumbItem webDav$={webDav$} filename={base} href={`#/`} onClick={() => openDirectory(base)}>
        <HomeOutlined />
      </BreadcrumbItem>
      {currentPaths.map((title, index) => {
        let filename = `/${currentPaths.slice(0, index + 1).join('/')}`;
        filename = index + 1 <= basePaths.length ? base : filename;
        return (<BreadcrumbItem webDav$={webDav$}
                                filename={filename}
                                href={`#${title}`}
                                onClick={() => {
                                  if (index + 1 <= basePaths.length) {
                                    openDirectory(base);
                                    return;
                                  }
                                  openDirectory(filename);
                                }}>
          <span>{title}</span>
        </BreadcrumbItem>)
      })}
    </Breadcrumb>
  );
};

export default Index;
