import React from 'react';
import styles from './index.less';
import classnames from "classnames";

export const Empty: React.FC<{
  /**
   * 设置样式名
   */
  className?: string;
  description?: string;
}> = ({description, className}) => {
  return (<div className={classnames(styles.empty, className)}><p>{description}</p></div>);
};

