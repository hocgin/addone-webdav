import React, {useEffect} from 'react';
import {Button, Form, Input, Modal, Radio, Select} from 'antd';
import {useBoolean, useRequest} from 'ahooks';
import {Utils} from '@hocgin/ui';
import {ServiceConfig, getConfig} from './service.config';
import WebDavService from "@/services/webdav";
import {WebDavData} from "@/services/webdav/types";

interface ValueType {
  id?: string;
  title?: string;
  service: string,
  auth?: 'digest' | 'basic' | 'token';
}

function asValues(data: WebDavData) {
  return {
    ...data
  }
}

const Index: React.FC<{
  className?: string;
  children?: string;
  id?: string;
  onOk?: () => void
}> = ({id, onOk, children}) => {
  let isEdit = id;

  let [form] = Form.useForm<ValueType>();
  let serviceOptions = ServiceConfig.map(({label, id}) => ({label, value: id}));
  let [open, {setTrue, setFalse}] = useBoolean(false);
  let $get = useRequest(WebDavService.get, {
    manual: true,
    onSuccess: (data) => form.setFieldsValue(asValues(data)),
  });
  let $submit = useRequest(WebDavService.save, {
    manual: true,
    onSuccess: onOk,
  });
  const authentication = Form.useWatch('auth', form);
  const service = Form.useWatch('service', form);
  let initialValues: ValueType = {service: 'custom'};
  useEffect(() => {
    if (id) {
      $get.runAsync(id);
    }
  });

  useEffect(() => {
    let config = getConfig(service) as any;
    form.setFieldValue('rootDir', config?.rootDir || '/')
  }, [service])


  let onFinish = async () => {
    let values = await form.validateFields();
    console.log('values', values);
  };

  return (
    <>
      <Button type="primary" block onClick={setTrue}>
        {children}
      </Button>
      <Modal
        maskClosable={false}
        title={isEdit ? "修改" : "新增"}
        visible={open}
        footer={[
          <Button onClick={setFalse}>取消</Button>,
          <Button
            key="submit"
            type="primary"
            loading={$submit.loading}
            onClick={onFinish}
          >
            保存
          </Button>,
        ]}
        onCancel={setFalse}
      >
        <Form
          form={form}
          labelCol={{span: 4}}
          wrapperCol={{span: 20}}
          colon={false}
          initialValues={initialValues}
        >
          <Form.Item name="title" label="名称">
            <Input />
          </Form.Item>
          <Form.Item name="service" label="服务商">
            <Select options={serviceOptions} />
          </Form.Item>
          <Form.Item name="auth" label="认证方式">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="digest">账号/密码</Radio.Button>
              <Radio.Button value="basic" disabled>
                Basic
              </Radio.Button>
              <Radio.Button value="token" disabled>
                授权
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          {(authentication === 'digest' && (
              <>
                <Form.Item name="username" label="用户名">
                  <Input />
                </Form.Item>
                <Form.Item name="password" label="密码">
                  <Input type="password" />
                </Form.Item>
              </>
            )) ||
            (authentication === 'basic' && <>basic</>) ||
            (authentication === 'token' && <>token</>)}
          <Form.Item name="remoteUrl" label="WebDav 服务地址">
            <Input />
          </Form.Item>
          <Form.Item name="rootDir" label="根目录">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
