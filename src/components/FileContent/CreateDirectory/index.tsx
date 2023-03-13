import * as React from 'react';
import {App, Input, Radio} from 'antd';
import {useLatest} from 'ahooks';
import {EventEmitter} from 'ahooks/lib/useEventEmitter';
import {WebDavEventType} from '@/_utils/types';
import {I18nKit} from '@hocgin/browser-addone-kit';

const Index: React.FC<{
  children?: any;
  disabled?: boolean;
  webDav$: EventEmitter<WebDavEventType>;
}> = ({disabled, children, webDav$}) => {
  let {modal} = App.useApp();
  let [title, setTitle] = React.useState<string>();
  const latestTitle = useLatest(title);
  let onClick = () => {
    modal.confirm({
      title: I18nKit.getMessageOrDefault('create_dir' as any),
      icon: <></>,
      content: (
        <Input
          placeholder={I18nKit.getMessageOrDefault('input_dir_placeholder' as any)}
          onChange={(v) => setTitle(v.target.value)}
        />
      ),
      onOk: async () => {
        webDav$.emit({type: 'create.directory', value: latestTitle.current});
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
