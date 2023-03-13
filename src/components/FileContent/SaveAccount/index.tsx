import React from 'react';
import {Button} from 'antd';
import {useBoolean} from 'ahooks';
import {PlusOutlined} from '@ant-design/icons';
import SaveModal from "@/components/FileContent/SaveAccount/SaveModal";

const Index: React.FC<{
  className?: string;
  children?: string;
  id?: string;
  onOk?: () => void;
}> = ({id, onOk, children}) => {
  let [open, {setTrue, setFalse}] = useBoolean(false);
  return (
    <>
      <Button icon={<PlusOutlined />} type="primary" block onClick={setTrue}>
        {children}
      </Button>
      <SaveModal id={id} visible={open} onCancel={setFalse} onOk={onOk} />
    </>
  );
};

export default Index;
