import React from 'react';
import styles from './index.less';
import {Avatar} from 'antd';
import Utils from '@/_utils/utils';
import {WebExtension} from '@hocgin/browser-addone-kit';

export const UrlCard: React.FC<{
  className?: string;
  title: string;
  imageSrc?: string;
  description?: string | React.ReactElement;
  href?: string;
}> = ({title, imageSrc, description, href}) => {
  console.log('imageSrc', imageSrc);
  if (!imageSrc && href) {
    imageSrc = WebExtension.runtime.getURL(
      `_favicon/?page_url=${encodeURIComponent(href)}&size=64`,
    );
  }
  description = Utils.getHostname(href) ?? href;
  const onClickOpenUrl = (item: any) => {
    let href = item?.url;
    if (!href) {
      return;
    }
    window.open(href, '_blank');
  };

  let newTitle = Utils.substr(title, 4);
  return (
    <div
      className={styles.component}
      onClick={onClickOpenUrl.bind(this, {title, imageSrc, url: href})}
    >
      <div className={styles.imageWrapper}>
        <Avatar
          shape={'square'}
          size={45}
          className={styles.image}
          src={imageSrc}>
          {newTitle}
        </Avatar>
      </div>
      <div className={styles.meta}>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.desc}>{description}</div>}
      </div>
    </div>
  );
};
