import React, {useState} from 'react';
import JSZip, {JSZipObject} from 'jszip';
import {useAsyncEffect, useRequest} from "ahooks";
import {Tree} from "antd";
import {DownOutlined} from "@ant-design/icons";

async function loadZip(url: string) {
  return await JSZip.loadAsync(new File([await fetch(url).then(r => r.blob())], "_"), {optimizedBinaryString: true});
}

function node(file: JSZipObject) {
  return {
    title: file.name,
    children: []
  };
}


const Index: React.FC<{
  fileUrl?: string;
  className?: string;
}> = ({fileUrl}) => {
  console.log('jszip', fileUrl);
  let [data, setData] = useState<any[]>([]);
  let $loadZip = useRequest(loadZip, {
    manual: true,
    onSuccess: (data: JSZip) => {
      console.log('data', data);
      // Object.values(data.files).map((file) => {
      //   return {
      //     title: 'parent 1-0',
      //     key: '0-0-0',
      //     children: []
      //   }
      // });
    },
  });
  useAsyncEffect(async () => {
    if (fileUrl) {
      await $loadZip.runAsync(fileUrl);
    }
  }, [fileUrl]);
  return (<div>
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      treeData={data}
    />
  </div>);
};

export default Index;
