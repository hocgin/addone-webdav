import React from 'react';
import {Button} from "antd";
import {SettingOutlined} from "@ant-design/icons";
import {useBoolean} from "ahooks";
import SettingsModal from "@/pages/dashboard/SettingButton/SettingsModal";

const Index: React.FC<{
  className?: string;
}> = (props, ref) => {
  let [open, {setTrue, setFalse}] = useBoolean(false);

  return (<>
    <SettingOutlined onClick={setTrue} />
    <SettingsModal visible={open} onCancel={setFalse} />
  </>);
};

export default Index;
