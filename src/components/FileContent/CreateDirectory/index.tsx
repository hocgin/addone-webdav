import * as React from 'react';
import { Input, Modal, Radio } from 'antd';
import { useLatest } from 'ahooks';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { WebDavEventType } from '@/_utils/types';

const Index: React.FC<{
  children?: any;
  webDav$: EventEmitter<WebDavEventType>;
}> = ({ children, webDav$ }) => {
  let [title, setTitle] = React.useState<string>();
  const latestTitle = useLatest(title);
  let onClick = () => {
    Modal.confirm({
      icon: undefined,
      content: (
        <Input
          placeholder="请输入文件夹名称"
          onChange={(v) => setTitle(v.target.value)}
        />
      ),
      onOk: async () => {
        webDav$.emit({ type: 'create.directory', value: latestTitle.current });
      },
    });
  };
  return <Radio.Button onClick={onClick}>{children}</Radio.Button>;
};

export default Index;
