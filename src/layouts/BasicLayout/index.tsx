import styles from './index.less';
import React from 'react';
import {Theme} from '@/components';

const BasicLayout: React.FC<{}> = ({children}: any) => {
  return (<Theme>
    <div className={styles.normal}>
      {children}
    </div>
  </Theme>);
};
export default BasicLayout;
