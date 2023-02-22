import React, {useRef, useState} from 'react';
import {Image, Input, message, Modal, App} from 'antd';
import {FileStat} from 'webdav/dist/node/types';
import {Icons} from '@/components';
import styles from './FileItem.less';
import RightMenu from '@right-menu/react';
import {EventEmitter} from 'ahooks/lib/useEventEmitter';
import {WebDavEventType} from '@/_utils/types';
import {useBoolean, useDrag, useDrop, useLatest} from 'ahooks';
import Utils from '@/_utils/utils';
import classnames from 'classnames';
import {i18nKit} from '@hocgin/browser-addone-kit';

const FileTypeImage: React.FC<{
  src?: string;
  className?: string;
  suffix?: string;
  type: 'file' | 'directory';
}> = ({className, suffix, type, src}) => {
  if ('directory' === type) {
    src = Icons.directory();
  } else {
    src = Icons.file(type, suffix);
  }
  return <Image className={className} preview={false} src={src}/>;
};

const Index: React.FC<{
  webDav$: EventEmitter<WebDavEventType>;
  onClick?: (data: FileStat) => void;
  className?: string;
  data: FileStat;
}> = ({data, onClick, webDav$}) => {
  console.log('data', data);
  const ref = useRef<any>();
  let {modal} = App.useApp();
  let [moved, {set: setMoved}] = useBoolean(false);
  let [title, setTitle] = useState(data.basename ?? '文件未命名');
  let latTitle = useLatest(title);
  // 拖动
  useDrag(data, ref, {
    onDragStart: console.log.bind(this, 'onDragStart'),
    onDragEnd: console.log.bind(this, 'onDragEnd'),
  });
  // 放入
  useDrop(ref, {
    onDom: (aData: FileStat, e) => {
      console.log('放入', aData);
      if (data.type === 'directory') {
        webDav$.emit({
          type: `move.${aData.type}`,
          value: {
            from: aData.filename,
            to: `${data.filename}/${aData.basename}`,
          },
        } as WebDavEventType);
        setMoved(false);
      }
    },
    onDragEnter: () => data.type === 'directory' && setMoved(true),
    onDragLeave: () => data.type === 'directory' && setMoved(false),
  });
  let options = [
    {
      type: 'li',
      text: i18nKit.getMessage(`preview` as any),
      callback: () =>
        webDav$.emit({type: `preview.${data.type}`, value: data.filename} as WebDavEventType),
    },
    {
      type: 'li',
      text: i18nKit.getMessage(`open` as any),
      callback: () =>
        webDav$.emit({type: `open.${data.type}`, value: data.filename} as WebDavEventType),
    },
    {
      type: 'li',
      text: i18nKit.getMessage(`download` as any),
      callback: () =>
        webDav$.emit({type: `download.${data.type}`, value: data.filename} as WebDavEventType),
    },
    {
      type: 'li',
      text: i18nKit.getMessage(`rename` as any),
      callback: () => {
        console.log('重命名.data', data);
        modal.confirm({
          title: i18nKit.getMessage(`rename` as any),
          icon: <></>,
          content: (
            <Input
              placeholder={i18nKit.getMessage(`newtitle` as any)}
              defaultValue={data.basename}
              onChange={(v) => setTitle(v.target.value)}
            />
          ),
          onOk: async () => {
            let newBasename = latTitle.current;
            if (!newBasename) {
              message.error(
                i18nKit.getMessage(`newtitle_error_message` as any),
              );
              return;
            }
            let fele = Utils.splitPath(data.filename);
            fele.pop();
            fele.push(newBasename);
            webDav$.emit({
              type: `move.${data.type}`,
              value: {
                from: data.filename,
                to: `/${fele.join('/')}`,
              },
            } as WebDavEventType);
          },
        });
      },
    },
    {
      type: 'li',
      disabled: true,
      text: i18nKit.getMessage(`click_copy` as any),
      callback: () => alert('点击了复制'),
    },
    {
      type: 'li',
      disabled: true,
      text: i18nKit.getMessage(`click_cut` as any),
      callback: () => alert('点击了剪切'),
    },
    {
      type: 'li',
      text: i18nKit.getMessage(`click_del` as any),
      callback: () =>
        modal.confirm({
          title: `${i18nKit.getMessage(`confirm_delete` as any)}"${
            data.basename
          }"`,
          onOk: () =>
            webDav$.emit({type: 'delete.file', value: data.filename}),
        }),
    },
  ];
  return (
    <a
      className={classnames(styles.a, {
        [styles.moved]: moved,
      })}
      href={`#${data.basename}`}
      ref={ref}
    >
      {/*@ts-ignore  theme={'win10'}*/}
      <RightMenu options={options as any}>
        <div className={styles.fileInfo} onClick={() => onClick?.(data)}>
          <FileTypeImage
            className={styles.image}
            type={data?.type as any}
            suffix={Utils.getSuffix(data.basename)}
          />
          <div className={styles.title}>{data.basename}</div>
        </div>
      </RightMenu>
    </a>
  );
};

export default Index;
