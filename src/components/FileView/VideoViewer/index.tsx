import React, {useState} from "react";
import {useAsyncEffect} from "ahooks";
import ReactMarkdown from 'react-markdown'

const Index: React.FC<{
  className?: string;
  fileUrl?: string;
}> = ({fileUrl}) => {
  return (<video src={fileUrl} controls/>);
};

export default Index;
