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
    setContent(await new File([fileUrl as any], '_').text());
  }, [fileUrl]);

  return (<>{content}</>);
};

export default Index;
