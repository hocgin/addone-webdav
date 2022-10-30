import React from 'react';
import classnames from 'classnames';
import {Helmet} from 'umi';

export const Container: React.FC<{
  className?: string;
  title?: string;
  description?: string;
  children?: any;
  keywords?: string[];
}> = ({title, description, keywords = [], children, className}) => {
  return <div>
    <Helmet>
      {title && <title>{title}</title>}
      {title && <meta name='title' content={title} />}
      <meta name='url' content={'/'} />
      {description && <meta name='description' content={description} />}
      {(keywords && keywords.length) && <meta name='keywords' content={keywords.join(',')} />}
    </Helmet>
    <div className={classnames(className)}>{children}</div>
  </div>;
};
