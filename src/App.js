import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ChatList from './ChatList';
import AppBar from './AppBar';
import { usrInfo, newUsrInfo } from './actions/index';
import { genuserinfo } from './genuserinfo';
function App() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [publicKey, setPublicKey] = useState('');
  useEffect(() => {
    var storedUserId = localStorage.getItem('userId');
    var storedPublicKey = localStorage.getItem('publicKey');
    if (storedUserId && storedPublicKey) {
      dispatch(new usrInfo(storedUserId)); 
      setUserId(storedUserId);
      setPublicKey(storedPublicKey);
    }
    else{
	    const info = genuserinfo();
	    storedUserId = info.id;
	    storedPublicKey =info.keypair.publickey;
    	    localStorage.setItem('userId',storedUserId);
    	    localStorage.setItem('publicKey',storedPublicKey);
	    dispatch(new newUsrInfo(storedUserId));
    }
    setUserId(storedUserId);
    setPublicKey(storedPublicKey);

  }, [userId,publicKey]);

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
	<AppBar usrid={userId}/>
	<ChatList/>
    </div>
  )
}

export default App;
