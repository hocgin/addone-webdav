import React, {useEffect, useState} from 'react';
import {useAsyncEffect} from "ahooks";

const Index: React.FC<{
  className?: string;
  fileUrl?: string;
}> = ({fileUrl}) => {
  let [content, setContent] = useState<string>();
  useAsyncEffect(async () => {
    if (!fileUrl) {
      return;
    }
    setContent(await new File([await fetch(fileUrl).then(r => r.blob())], '_').text());
  }, [fileUrl]);

  return (<code style={{textAlign: 'unset'}}>{content}</code>);
};

export default Index;
