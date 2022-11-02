import React, {useEffect, useState} from 'react';
// @ts-ignore
import FileViewer from 'react-file-viewer';
import Utils from '@/_utils/utils';
import WebDavService from '@/services/webdav';
import {useAsyncEffect, useRequest} from 'ahooks';
import {Modal, Image} from 'antd';
import memoizeOne from 'memoize-one';
import TextViewer from './TextViewer';
import styles from './index.less';
import ZipViewer from "./ZipViewer";

/**
 * https://github.com/plangrid/react-file-viewer
 * @param fileUrl
 * @param fileType
 * @constructor
 */
export const FileView: React.FC<{
  className?: string;
  fileType?: string;
  fileUrl?: string;
}> = ({fileUrl, fileType = 'unknown'}) => {
  console.log(`fileType=${fileType}, fileUrl=${fileUrl}`);
  if (['png', 'jpeg', 'gif', 'jpg', 'webp'].includes(fileType)) {
    return <Image preview={false} src={fileUrl} />;
  }
  if (['md', 'txt', 'js'].includes(fileType)) {
    return <TextViewer fileUrl={fileUrl} />;
  }
  if (['zip'].includes(fileType)) {
    return <ZipViewer fileUrl={fileUrl} />;
  }
  return (
    <FileViewer
      fileType={fileType}
      filePath={fileUrl}
      onError={console.error.bind(this, 'FileView')}
    />
  );
};

const getFileContent = memoizeOne(WebDavService.getFileContents);
const getFileBase64 = (data: ArrayBuffer, suffix: string = 'unknown') => {
  // let type = 'image';
  // if (['md', 'txt', 'unknown'].includes(suffix)) {
  //   suffix = 'plain';
  //   type = 'text';
  // }
  // return `data:${type}/${suffix};base64,${Buffer.from(data).toString('base64')}`;
  return window.URL.createObjectURL(new Blob([data]));
};

export const useFileView = (clientId?: string, _filename?: string) => {
  let [fileUrl, setFileUrl] = useState<string | undefined>();
  let [fileType, setFileType] = useState<string | undefined>();
  let updateFileData = (data: ArrayBuffer, filename: string) => {
    let fileType = Utils.getSuffix(filename);
    let fileUrl = getFileBase64(data, fileType);
    setFileType(fileType);
    setFileUrl(fileUrl);
  };
  let $getFileContents = useRequest(getFileContent, {
    manual: true,
    onSuccess: (data: ArrayBuffer, params: any) => {
      console.log('params', params);
      updateFileData(data, params?.[1]);
    },
  });
  return [
    fileUrl,
    fileType,
    {
      setFilename: (filename?: string) => {
        if (clientId && filename) {
          return $getFileContents.run(clientId, filename);
        } else {
          setFileUrl(undefined);
        }
      },
      setAsyncFilename: async (filename?: string) => {
        if (clientId && filename) {
          await $getFileContents.runAsync(clientId, filename);
        } else {
          setFileUrl(undefined);
        }
        return fileUrl;
      },
    },
  ] as const;
};

export const FileViewModal: React.FC<{
  className?: string;
  visible?: boolean;
  clientId?: string;
  fileUrl?: string;
  fileType?: string;
  onCancel?: () => void;
}> = ({visible, fileUrl, fileType, onCancel}) => {
  return (
    <Modal
      maskClosable={true}
      closable={false}
      title={'预览'}
      footer={undefined}
      className={styles.modal}
      onCancel={onCancel}
      visible={visible}
    >
      {visible ? <FileView fileType={fileType} fileUrl={fileUrl} /> : <></>}
    </Modal>
  );
};
