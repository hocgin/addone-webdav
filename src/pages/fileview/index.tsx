import React from 'react';
import { FileView } from '@/components/FileView';
import useUrlState from '@ahooksjs/use-url-state';
import { Empty } from '@/components';

const Index = () => {
  let [params] = useUrlState({ fileUrl: undefined, fileType: undefined });
  return (
    <div>
      {params.fileUrl ? (
        <FileView fileType={params.fileType} fileUrl={params.fileUrl} />
      ) : (
        <Empty description={'文件地址错误'} />
      )}
    </div>
  );
};

export default Index;
