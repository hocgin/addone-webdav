import React, {useEffect, useState} from 'react';
// @ts-ignore
import FileViewer from 'react-file-viewer';
import Utils from '@/_utils/utils';
import WebDavService from '@/services/webdav';
import {useAsyncEffect, useRequest} from 'ahooks';
import {Modal, Image} from 'antd';
import memoizeOne from 'memoize-one';
import Text from './Text';
import styles from './index.less';

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
  if (['png', 'jpeg', 'gif', 'jpg'].includes(fileType)) {
    return <Image preview={false} src={fileUrl} />;
  }
  if (['md', 'txt', 'js'].includes(fileType)) {
    return <Text fileUrl={fileUrl} />
  }
  return (
    <FileViewer fileType={fileType} filePath={fileUrl} onError={console.error.bind(this, 'FileView')} />
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
  return window.URL.createObjectURL(new Blob([data]))
};

export const FileViewModal: React.FC<{
  className?: string;
  visible?: boolean;
  clientId?: string;
  filename?: string;
  onCancel?: () => void;
}> = ({visible, clientId, filename, onCancel}) => {
  let [fileUrl, setFileUrl] = useState<string | undefined>();
  let suffix = Utils.getSuffix(filename);
  let $getFileContents = useRequest(getFileContent, {
    manual: true,
    onSuccess: (data: ArrayBuffer) => setFileUrl(getFileBase64(data, suffix)),
  });
  useAsyncEffect(async () => {
    if (visible && clientId && filename) {
      await $getFileContents.runAsync(clientId, filename);
    }
  }, [filename]);

  useEffect(() => {
    !visible && setFileUrl(undefined);
  }, [visible]);

  console.log('visible', visible);
  return (
    <Modal maskClosable={true}
           closable={false}
           title={'预览'}
           footer={undefined}
           className={styles.modal}
           onCancel={onCancel}
           visible={visible}>
      {visible ? <FileView fileType={suffix} fileUrl={fileUrl} /> : <></>}
    </Modal>
  );
};
