import React, {useEffect, useState} from 'react';
import {useAsyncEffect} from "ahooks";
import SyntaxHighlighter from "react-syntax-highlighter";

const Index: React.FC<{
  className?: string;
  fileUrl?: string;
}> = ({fileUrl}) => {
  let [content, setContent] = useState<string | any>();
  useAsyncEffect(async () => {
    if (!fileUrl) return;
    setContent(await new File([await fetch(fileUrl).then(r => r.blob())], '_').text());
  }, [fileUrl]);
  return (<SyntaxHighlighter language={'javascript'}>{content}</SyntaxHighlighter>);
};

export default Index;
