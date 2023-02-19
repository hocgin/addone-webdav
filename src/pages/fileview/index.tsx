import React from 'react';
import { FileView } from '@/components/FileView';
import useUrlState from '@ahooksjs/use-url-state';
import { Empty } from '@/components';
import styles from './index.less';
import { i18nKit } from '@hocgin/browser-addone-kit';

const Index = () => {
  let [params] = useUrlState({ fileUrl: undefined, fileType: undefined });
  console.log('params', params);
  return (
    <div className={styles.fileview}>
      {params.fileUrl ? (
        <FileView fileType={params.fileType} fileUrl={params.fileUrl} />
      ) : (
        <Empty description={i18nKit.getMessage(`fileview_error` as any)} />
      )}
    </div>
  );
};

export default Index;
