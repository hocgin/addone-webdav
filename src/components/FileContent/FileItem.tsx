import React, { useState } from 'react';
import { Image, Input, message, Modal } from 'antd';
import { FileStat } from 'webdav/dist/node/types';
import { Icons } from '@/components';
import styles from './FileItem.less';
import RightMenu from '@right-menu/react';
import { OptionsType } from '@right-menu/core';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { WebDavEventType } from '@/_utils/types';
import { useLatest } from 'ahooks';
import Utils from '@/_utils/utils';

const FileTypeImage: React.FC<{
  src?: string;
  className?: string;
  type: 'file' | 'directory';
}> = ({ className, type, src }) => {
  if ('directory' === type) {
    src = Icons.directory();
  } else {
    src = Icons.file(type);
  }
  return <Image className={className} preview={false} src={src} />;
};

const Index: React.FC<{
  webDav$: EventEmitter<WebDavEventType>;
  onClick?: (data: FileStat) => void;
  className?: string;
  data: FileStat;
}> = ({ data, onClick, webDav$ }) => {
  let [title, setTitle] = useState(data.basename ?? '文件未命名');
  let latTitle = useLatest(title);

  let options = [
    {
      type: 'li',
      text: '浏览',
      callback: () =>
        webDav$.emit({ type: `preview.${data.type}`, value: data.filename }),
    },
    {
      type: 'li',
      text: '打开',
      callback: () =>
        webDav$.emit({ type: `open.${data.type}`, value: data.filename }),
    },
    {
      type: 'li',
      text: '下载',
      callback: () =>
        webDav$.emit({ type: `download.${data.type}`, value: data.filename }),
    },
    {
      type: 'li',
      text: '重命名',
      callback: () => {
        return Modal.confirm({
          icon: undefined,
          content: (
            <Input
              placeholder="新名称"
              defaultValue={title}
              onChange={(v) => setTitle(v.target.value)}
            />
          ),
          onOk: async () => {
            let newBasename = latTitle.current;
            if (!newBasename) {
              message.error('请输入正确的名称');
              return;
            }
            let fele = Utils.splitPath(data.filename);
            fele.pop();
            fele.push(newBasename);
            webDav$.emit({
              type: `rename.${data.type}`,
              value: {
                from: data.filename,
                to: `/${fele.join('/')}`,
              },
            });
          },
        });
      },
    },
    {
      type: 'li',
      disabled: true,
      text: '复制',
      callback: () => alert('点击了复制'),
    },
    {
      type: 'li',
      disabled: true,
      text: '剪切',
      callback: () => alert('点击了剪切'),
    },
    {
      type: 'li',
      text: '删除',
      callback: () =>
        Modal.confirm({
          title: `确认删除文件"${title}"`,
          onOk: () =>
            webDav$.emit({ type: 'delete.file', value: data.filename }),
        }),
    },
  ];
  return (
    <a className={styles.a} href={`#${title}`}>
      {/*@ts-ignore  theme={'win10'}*/}
      <RightMenu options={options}>
        <div className={styles.fileInfo} onClick={() => onClick?.(data)}>
          <FileTypeImage className={styles.image} type={data?.type} />
          <div className={styles.title}>{title}</div>
        </div>
      </RightMenu>
    </a>
  );
};

export default Index;
