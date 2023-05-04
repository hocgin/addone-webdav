import React from 'react';
import {Form, Modal, Radio} from 'antd';
import {useRequest} from "ahooks";
import AppStorage, {UserSettingKey} from "@/_utils/storage";
import {OpenType} from '@/_types';

const Index: React.FC<{
  settingKey?: UserSettingKey;
  className?: string;
  visible?: boolean;
  onCancel?: () => void;
}> = ({onCancel, visible = false, settingKey = UserSettingKey.Common}) => {
  let [form] = Form.useForm();
  useRequest(AppStorage.getUserSettingWithKey, {
    defaultParams: [settingKey],
    onSuccess: form.setFieldsValue,
  });
  return <Modal closable={false} maskClosable={false} title="设置" open={visible} onCancel={onCancel}
                onOk={async () => {
                  let values = form.getFieldsValue();
                  console.log('onFinish', values);
                  await AppStorage.updateUserSettingWithKey(settingKey, values);
                  onCancel?.();
                }}>
    <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 20}} colon={false}>
      <Form.Item label="打开方式" name="openType">
        <Radio.Group buttonStyle="solid">
          <Radio.Button value={OpenType.Popup}>弹窗</Radio.Button>
          <Radio.Button value={OpenType.Tab}>标签页</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  </Modal>;
};

export default Index;
