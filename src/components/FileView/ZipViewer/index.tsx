import React, {useState} from 'react';
import JSZip, {JSZipObject} from 'jszip';
import {useAsyncEffect, useRequest} from "ahooks";
import {Tree} from "antd";
import {DownOutlined} from "@ant-design/icons";
import Utils from "@/_utils/utils";

async function loadZip(url: string) {
  let data = await JSZip.loadAsync(new File([await fetch(url).then(r => r.blob())], "_"), {
    createFolders: true,
    optimizedBinaryString: true
  });
  return asJSZipNode(data);
}

class Node {
  public key?: string;
  public title?: string;
  public parentKey?: string;
  public children?: Node[];
  public dir: boolean = false;
  public file?: JSZipObject;
}

function asJSZipNode(data: JSZip) {
  let result: Node[] = [];
  let maps: Record<string, Node> = {};
  let nodes = (Object.values(data.files) || []).map((file: JSZipObject) => {
    let paths = Utils.splitPath(file.name);
    let item = new Node();
    item.file = file;
    item.key = file.name;
    item.title = paths.pop();
    item.dir = file.dir;
    if (file.name.includes('/')) {
      let pName = file.name;
      if (item.dir) {
        item.children = [];
        pName = pName.substring(0, pName.length - 1);
        item.parentKey = pName.substring(0, pName.lastIndexOf('/'))
      } else {
        item.parentKey = pName.substring(0, pName.lastIndexOf('/')) + "/";
      }
    }
    maps[file.name] = item;
    return item;
  });
  console.log('nodes.convert', nodes);
  nodes.forEach(item => {
    if (!item.parentKey) {
      result.push(item);
      return;
    }
    let node = maps[item.parentKey];
    if (!node) {
      return;
    }

    if (!node.children) {
      node.children = [];
    }
    node.children.push(item);
  });
  console.log('nodes.tree', nodes);
  return result;
}

const Index: React.FC<{
  fileUrl?: string;
  className?: string;
}> = ({fileUrl}) => {
  console.log('jszip', fileUrl);
  let [data, setData] = useState<Node[]>([]);
  let $loadZip = useRequest(loadZip, {
    manual: true,
    onSuccess: setData,
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
      treeData={data as any}
    />
  </div>);
};

export default Index;
