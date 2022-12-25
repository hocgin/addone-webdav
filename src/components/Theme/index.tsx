import React from 'react';
import { ConfigProvider } from 'antd';
import { ANT_PREFIX_CLS } from '../../../config/antd.prefix.cls';
import theme from '@/theme';

export const Theme: React.FC<{
  children?: any;
}> = ({ children }) => {
  return (<ConfigProvider prefixCls={ANT_PREFIX_CLS} theme={{ token: theme }}>{children}</ConfigProvider>);
};

