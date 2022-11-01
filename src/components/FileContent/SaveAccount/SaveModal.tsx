import React, {useEffect} from 'react';
import {Button, Form, Input, Modal, Radio, Select} from 'antd';
import {useRequest} from 'ahooks';
import WebDavService from '@/services/webdav';
import {
  getConfig,
  ServiceConfig,
} from '@/components/FileContent/SaveAccount/service.config';
import {WebDavAuthType, WebDavServiceType} from '@/services/webdav/types';
import {AuthType} from 'webdav';

const Index: React.FC<{
  /**
   * 设置样式名
   */
  className?: string;
  id?: string;
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}> = ({id, onOk, onCancel, visible = false}) => {
  let isEdit = id;
  let [form] = Form.useForm();
  let $get = useRequest(WebDavService.get, {
    manual: true,
    onSuccess: (data) => form.setFieldsValue(data),
  });
  const authentication = Form.useWatch('auth', form);
  const service = Form.useWatch('service', form);
  let initialValues = {
    service: WebDavServiceType.custom,
    auth: WebDavAuthType.digest,
  };
  let serviceOptions = ServiceConfig.map(({label, id}) => ({
    label,
    value: id,
  }));
  useEffect(() => {
    id && $get.runAsync(id);
  }, [id]);
  let $submit = useRequest(WebDavService.save, {
    manual: true,
    onSuccess: onOk,
  });
  let onFinish = async () => {
    let values = await form.validateFields();
    await $submit.runAsync(values as any);
    onCancel?.();
  };
  useEffect(() => {
    let config = getConfig(service) as any;
    form.setFieldValue('rootDir', config?.rootDir);
    form.setFieldValue('remoteUrl', config?.remoteUrl);
  }, [service]);
  return (
    <Modal
      maskClosable={false}
      title={isEdit ? '修改' : '新增'}
      visible={visible}
      footer={[
        <Button onClick={onCancel}>取消</Button>,
        <Button
          key="submit"
          type="primary"
          loading={$submit.loading}
          onClick={onFinish}
        >
          保存
        </Button>,
      ]}
      onCancel={onCancel}
    >
      <Form
        form={form}
        labelCol={{span: 6}}
        wrapperCol={{span: 18}}
        colon={false}
        initialValues={initialValues}
      >
        <Form.Item name="id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="名称"
          rules={[{required: true, message: '名称不能为空'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="service"
          label="服务商"
          rules={[{required: true, message: '服务商不能为空'}]}
        >
          <Select options={serviceOptions} />
        </Form.Item>
        <Form.Item name="auth" label="认证方式">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={WebDavAuthType.digest}>账号</Radio.Button>
            <Radio.Button value={WebDavAuthType.basic} disabled>
              基础
            </Radio.Button>
            <Radio.Button value={WebDavAuthType.token} disabled>
              授权
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        {(authentication === WebDavAuthType.digest && (
            <>
              <Form.Item name="username" label="用户名">
                <Input />
              </Form.Item>
              <Form.Item name="password" label="密码">
                <Input type="password" />
              </Form.Item>
            </>
          )) ||
          (authentication === WebDavAuthType.basic && <>basic</>) ||
          (authentication === WebDavAuthType.token && <>token</>)}
        <Form.Item
          name="remoteUrl"
          label="WebDav 地址"
          rules={[{required: true, message: 'WebDav 地址不能为空'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="rootDir"
          label="根目录"
          rules={[{required: true, message: '根目录不能为空'}]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Index;