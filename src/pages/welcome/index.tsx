import {useHistory, useLocation, useParams} from "dumi";
import {useEffect} from "react";
import {WebExtension} from "@hocgin/browser-addone-kit";

export default ({children}) => {
  const {location}: any = useHistory();
  let query: any = location?.query ?? {};
  useEffect(() => {
    WebExtension.kit.setUserToken(query?.token).then(() => {
      WebExtension.kit.getUserToken().then(console.log)
    });
  }, []);
  // 版本功能介绍
  // VIP 功能介绍
  // 用户信息

  return <div>Welcome {JSON.stringify(query)}</div>;
};
