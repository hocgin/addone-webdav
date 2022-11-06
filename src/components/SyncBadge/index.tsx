import React from 'react';
import {CloudSyncOutlined} from '@ant-design/icons';
import classnames from 'classnames';
import styles from './index.less';

export const SyncBadge: React.FC<{
  className?: string;
  count?: number;
}> = ({className, count = 0}) => {
  return (
    <div className={classnames(className, styles.syncBadge)}>
      <CloudSyncOutlined style={{fontSize: 20}} />
      <span className={styles.dot}>x</span>
      <span className={styles.count}>{`${count}`}</span>
    </div>
  );
};

