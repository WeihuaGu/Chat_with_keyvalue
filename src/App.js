import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ChatList from './ChatList';
import AppBar from './AppBar';
function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state)=>{return state.usrinfo.id});
  /**
  const [publicKey, setPublicKey] = useState('');
  useEffect(() => {

  }, [userId,publicKey]);
  **/

  return (
    <div>
	<AppBar />
	<ChatList/>
    </div>
  )
}

export default App;
