import styles from './index.less';
import React from 'react';
import {Footer} from "@hocgin/ui";

const BasicLayout: React.FC<{}> = (props, ref) => {
  return (<div className={styles.normal}>
    <h1 className={styles.title}>Yay! Welcome to umi!</h1>
    {props.children}
    <Footer />
  </div>);
};
export default BasicLayout;
