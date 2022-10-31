import React from 'react';
import {message, Upload, UploadProps} from "antd";
import {EventEmitter} from "ahooks/lib/useEventEmitter";
import {WebDavEventType} from "@/_utils/types";

const Index: React.FC<{
  children?: string;
  directory?: boolean;
  webDav$: EventEmitter<WebDavEventType>;
}> = ({children, webDav$, directory = false}) => {
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: (file) => {
      webDav$.emit({type: 'upload.file', value: file})
      return file.uid;
    },
    fileList: [],
    directory: directory
  };
  return <Upload {...props}>
    {children}
  </Upload>;
};

export default Index;
