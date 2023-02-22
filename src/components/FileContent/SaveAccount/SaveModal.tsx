import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Radio, Select } from 'antd';
import { useRequest } from 'ahooks';
import WebDavService from '@/services/webdav';
import {
  getConfig,
  ServiceConfig,
} from '@/components/FileContent/SaveAccount/service.config';
import { WebDavAuthType, WebDavServiceType } from '@/services/webdav/types';
import { AuthType } from 'webdav';
import { UrlCard } from '@/components';
import { I18nKit } from '@hocgin/browser-addone-kit';

const Index: React.FC<{
  /**
   * 设置样式名
   */
  className?: string;
  id?: string;
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}> = ({ id, onOk, onCancel, visible = false }) => {
  let isEdit = id;
  let [form] = Form.useForm();
  let $get = useRequest(WebDavService.get, {
    manual: true,
    onSuccess: (data) => form.setFieldsValue(data),
  });
  let [config, setConfig] = useState<any | undefined>(undefined);

  const authentication = Form.useWatch('auth', form);
  const service = Form.useWatch('service', form);
  let initialValues = {
    service: WebDavServiceType.custom,
    auth: WebDavAuthType.password,
  };
  let serviceOptions: any[] =
    ServiceConfig.map(({ label, id }) => ({
      label,
      value: id as any,
    })) ?? [];
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
    let config = getConfig(service as string) as any;
    form.setFieldValue('rootDir', config?.rootDir);
    form.setFieldValue('remoteUrl', config?.remoteUrl);
    setConfig(config);
  }, [service]);
  return (
    <Modal
      closable={false}
      maskClosable={false}
      title={
        isEdit
          ? I18nKit.getMessageOrDefault('modify' as any)
          : I18nKit.getMessageOrDefault('add' as any)
      }
      open={visible}
      footer={[
        <Button onClick={onCancel}>
          {I18nKit.getMessageOrDefault('cancel' as any)}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={$submit.loading}
          onClick={onFinish}
        >
          {I18nKit.getMessageOrDefault('save' as any)}
        </Button>,
      ]}
      onCancel={onCancel}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        colon={false}
        initialValues={initialValues}
      >
        <Form.Item name="id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label={I18nKit.getMessageOrDefault('title' as any)}
          rules={[
            {
              required: true,
              message: I18nKit.getMessageOrDefault('title_required' as any),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="service"
          label={I18nKit.getMessageOrDefault('service' as any)}
          rules={[
            {
              required: true,
              message: I18nKit.getMessageOrDefault('service_required' as any),
            },
          ]}
        >
          <Select options={serviceOptions} />
        </Form.Item>
        <Form.Item name="auth" label={I18nKit.getMessageOrDefault('auth' as any)}>
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={WebDavAuthType.password}>
              {I18nKit.getMessageOrDefault('auth_password' as any)}
            </Radio.Button>
            {/*<Radio.Button value={WebDavAuthType.digest} disabled>*/}
            {/*  密码*/}
            {/*</Radio.Button>*/}
            {/*<Radio.Button value={WebDavAuthType.token} disabled>*/}
            {/*  应用授权*/}
            {/*</Radio.Button>*/}
          </Radio.Group>
        </Form.Item>
        {(authentication === WebDavAuthType.password && (
          <>
            <Form.Item
              name="username"
              label={I18nKit.getMessageOrDefault('username' as any)}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label={I18nKit.getMessageOrDefault('password' as any)}
            >
              <Input type="password" />
            </Form.Item>
          </>
        )) ||
          (authentication === WebDavAuthType.digest && <>digest</>) ||
          (authentication === WebDavAuthType.token && <>token</>)}
        <Form.Item
          name="remoteUrl"
          label={I18nKit.getMessageOrDefault('webdav_address' as any)}
          rules={[
            {
              required: true,
              message: I18nKit.getMessageOrDefault('webdav_address_required' as any),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="rootDir"
          label={I18nKit.getMessageOrDefault(`root_dir` as any)}
          rules={[
            {
              required: true,
              message: I18nKit.getMessageOrDefault(`root_dir_required` as any),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
      {config?.urlDoc && (
        <UrlCard
          title={config.urlDoc?.title}
          href={config.urlDoc?.href}
          imageSrc={config.urlDoc?.imageSrc}
          description={config.urlDoc?.description}
        />
      )}
    </Modal>
  );
};

export default Index;
