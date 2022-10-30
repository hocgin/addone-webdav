import React from 'react';
import { Container } from '@/components';
import { useModel, useIntl, Link, SelectLang, getAllLocales, localeInfo } from 'umi';
import { DatePicker } from 'antd';
import { Utils } from '@hocgin/ui';
import moment from 'moment';

const Index: React.FC<{
  /**
   * 设置样式名
   */
  className?: string;
}> = (props, ref) => {
  // 全局状态管理
  const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
  const { user, fetchUser } = useModel('apps');
  let intl = useIntl();

  console.log('->', moment.version, moment.locale());
  console.log('->', getAllLocales(), localeInfo);
  console.log('00', intl.formatRelativeTime(1, 'day'));

  return <Container>
    <h1>全局状态</h1>
    <div>{JSON.stringify(initialState)}</div>
    <h1>i18n
      <SelectLang />
    </h1>
    <div>多语言文本: {intl.formatMessage({ id: 'demo.title' })}</div>
    <div>多语言时间: {moment(1316116057189).fromNow()}</div>
    <div onClick={() => moment.locale('zh-cn')}>多语言时间: {Utils.Format.DateTime.relativeFromNow(new Date().getTime() - 1000)}</div>
    <div>多语言时间: <DatePicker /></div>
    <h1>页面</h1>
    <div>
      <Link to={'/ssr'}>SSR</Link><br />
      <Link to={'/404'}>404</Link>
    </div>
  </Container>;
};

export default Index;
