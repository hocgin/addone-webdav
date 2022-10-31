import * as React from 'react';
import {Dropdown, Menu} from 'antd';
import {EventEmitter} from 'ahooks/lib/useEventEmitter';
import {WebDavEventType} from '@/_utils/types';
import {UploadOutlined} from '@ant-design/icons';
import UploadButton from "@/components/FileContent/UploadFile/UploadButton";


const Index: React.FC<{
  children?: any;
  webDav$: EventEmitter<WebDavEventType>;
}> = ({children, webDav$}) => {
  return <Dropdown.Button overlay={<Menu
    items={[{
      label: <UploadButton webDav$={webDav$}>上传文件</UploadButton>,
      key: 'file',
    }, {
      label: <UploadButton webDav$={webDav$} directory={true}>上传文件夹</UploadButton>,
      key: 'directory',
    }]}
  />} type="primary">
    <UploadOutlined /><UploadButton webDav$={webDav$} style={{color: '#fff'}}>{children}</UploadButton>
  </Dropdown.Button>;
};

export default Index;
