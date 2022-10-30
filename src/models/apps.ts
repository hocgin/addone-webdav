import { useState, useCallback } from 'react';

/**
 * namespace 为文件名 => apps
 */
export default () => {
  const [user, setUser] = useState(null);
  const fetchUser = useCallback((account, password) => {
    console.log('发起请求', account, password);
  }, []);

  // 挂载状态 / 函数
  return {
    user,
    fetchUser,
  };
}
