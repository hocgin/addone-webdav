import React from 'react';
import {Upload, UploadProps} from "antd";
import {EventEmitter} from "ahooks/lib/useEventEmitter";
import {WebDavEventType} from "@/_utils/types";
import classnames from "classnames";

const Index: React.FC<{
  style?: any;
  className?: string;
  children?: any;
  directory?: boolean;
  webDav$: EventEmitter<WebDavEventType>;
}> = ({className, style, children, webDav$, directory = false}) => {
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
  return <Upload {...props} className={classnames(className)} style={{width: '100%'}}>
    {children}
  </Upload>;
};

export default Index;
