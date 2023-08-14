import React,{ useState, useEffect } from 'react';
import ChatList from './ChatList';
import AppBar from './AppBar';
function App() {
  const [userId, setUserId] = useState('');
  const [publicKey, setPublicKey] = useState('');
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedPublicKey = localStorage.getItem('publicKey');

    if (storedUserId && storedPublicKey) {
      setUserId(storedUserId);
      setPublicKey(storedPublicKey);
    }
  }, []);

  useEffect(() => {
    // 在这里执行轮询逻辑，使用 userId 和 publicKey
    console.log('Start polling with userId:', userId);
    console.log('Start polling with publicKey:', publicKey);

    // 清理函数在组件卸载时会被调用
    return () => {
      // 在这里清除轮询定时器或取消其他轮询相关的操作
      console.log('Stop polling');
    };
  }, [userId, publicKey]);
  return (
    <div>
	<AppBar/>
	<ChatList/>
    </div>
  )
}

export default App;
