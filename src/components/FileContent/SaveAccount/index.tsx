import React, {useEffect} from 'react';
import {Button, Form, Input, Modal, Radio, Select} from 'antd';
import {useBoolean, useRequest} from 'ahooks';
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
      <Button type="primary" block onClick={setTrue}>
        {children}
      </Button>
      <SaveModal id={id} visible={open} onCancel={setFalse} onOk={onOk} />
    </>
  );
};

export default Index;
