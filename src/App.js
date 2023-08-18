import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { testAction } from './actions/index.js';
import ChatList from './ChatList';
import AppBar from './AppBar';
function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state)=>{return state.usrinfo.id});
  useEffect(() => {
    dispatch(new testAction());

  }, []);

  return (
    <div>
	<AppBar />
	<ChatList/>
    </div>
  )
}

export default App;
