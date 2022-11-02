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

const Index: React.FC<{
  className?: string;
  visible?: boolean;
  onCancel?: () => void;
}> = ({ onCancel, visible = false }) => {
  let [form] = Form.useForm();
  return (
    <Modal
      closable={false}
      maskClosable={false}
      title="设置"
      visible={visible}
      onCancel={onCancel}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        colon={false}
      >
        <Form.Item name="lang" label="语言">
          <Select
            options={[
              {
                label: '中文',
                value: 'zh-CN',
              },
            ]}
            defaultValue={'zh-CN'}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Index;
