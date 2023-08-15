import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ChatList from './ChatList';
import AppBar from './AppBar';
function App() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [publicKey, setPublicKey] = useState('');
  useEffect(() => {

  }, [userId,publicKey]);

  return (
    <div>
	<AppBar usrid={userId}/>
	<ChatList/>
    </div>
  )
}

export default App;
