import * as React from 'react';
import { App, Input, Radio } from 'antd';
import { useLatest } from 'ahooks';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { WebDavEventType } from '@/_utils/types';

const Index: React.FC<{
  children?: any;
  disabled?: boolean;
  webDav$: EventEmitter<WebDavEventType>;
}> = ({ disabled, children, webDav$ }) => {
  let { modal } = App.useApp();
  let [title, setTitle] = React.useState<string>();
  const latestTitle = useLatest(title);
  let onClick = () => {
    modal.confirm({
      title: `新建文件夹`,
      icon: <></>,
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
  return (
    <Radio.Button onClick={onClick} disabled={disabled}>
      {children}
    </Radio.Button>
  );
};

export default Index;
