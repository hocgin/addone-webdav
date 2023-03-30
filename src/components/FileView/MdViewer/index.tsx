import React, {useState} from "react";
import {useAsyncEffect} from "ahooks";
import ReactMarkdown from 'react-markdown'

const Index: React.FC<{
  className?: string;
  fileUrl?: string;
}> = ({fileUrl}) => {
  let [content, setContent] = useState<string | any>();
  useAsyncEffect(async () => {
    if (!fileUrl) return;
    setContent(await new File([await fetch(fileUrl).then(r => r.blob())], '_').text());
  }, [fileUrl]);
  return (<div style={{textAlign: 'unset'}}><ReactMarkdown children={content}/></div>);
};

export default Index;
