import styles from './index.less';
import React from 'react';

const BasicLayout: React.FC<{}> = (props, ref) => {
  return (<div className={styles.normal}>
    {props.children}
  </div>);
};
export default BasicLayout;
