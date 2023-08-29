import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { testAction } from './actions/index.js';
import ChatList from './ChatList';
import AppBar from './AppBar';
function App() {
  const dispatch = useDispatch();
  const cleanwhat = 'all';
  useEffect(() => {
    dispatch(new testAction());

  }, []);

  return (
    <div>
	<AppBar cleanwhat={cleanwhat} />
	<ChatList/>
    </div>
  )
}

export default App;
