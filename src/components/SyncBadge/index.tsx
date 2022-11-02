import React from 'react';
import { CloudSyncOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

const Index: React.FC<{
  className?: string;
  count?: number;
}> = ({ className, count }) => {
  return (
    <div className={classnames(className, styles.syncBadge)}>
      <CloudSyncOutlined style={{ fontSize: 20 }} />
      <span className={styles.dot}>x</span>
      <span className={styles.count}>{`${count}`}</span>
    </div>
  );
};

export default Index;
