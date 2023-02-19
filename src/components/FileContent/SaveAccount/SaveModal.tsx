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
import { i18nKit } from '@hocgin/browser-addone-kit';

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
          ? i18nKit.getMessage('modify' as any)
          : i18nKit.getMessage('add' as any)
      }
      open={visible}
      footer={[
        <Button onClick={onCancel}>
          {i18nKit.getMessage('cancel' as any)}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={$submit.loading}
          onClick={onFinish}
        >
          {i18nKit.getMessage('save' as any)}
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
          label={i18nKit.getMessage('title' as any)}
          rules={[
            {
              required: true,
              message: i18nKit.getMessage('title_required' as any),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="service"
          label={i18nKit.getMessage('service' as any)}
          rules={[
            {
              required: true,
              message: i18nKit.getMessage('service_required' as any),
            },
          ]}
        >
          <Select options={serviceOptions} />
        </Form.Item>
        <Form.Item name="auth" label={i18nKit.getMessage('auth' as any)}>
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={WebDavAuthType.password}>
              {i18nKit.getMessage('auth_password' as any)}
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
              label={i18nKit.getMessage('username' as any)}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label={i18nKit.getMessage('password' as any)}
            >
              <Input type="password" />
            </Form.Item>
          </>
        )) ||
          (authentication === WebDavAuthType.digest && <>digest</>) ||
          (authentication === WebDavAuthType.token && <>token</>)}
        <Form.Item
          name="remoteUrl"
          label={i18nKit.getMessage('webdav_address' as any)}
          rules={[
            {
              required: true,
              message: i18nKit.getMessage('webdav_address_required' as any),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="rootDir"
          label={i18nKit.getMessage(`root_dir` as any)}
          rules={[
            {
              required: true,
              message: i18nKit.getMessage(`root_dir_required` as any),
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
