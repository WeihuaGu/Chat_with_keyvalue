import React from 'react';
import ChatList from './ChatList';
import AppBar from './AppBar';
import { useDispatch } from 'react-redux'
import { onChatingId } from './actions/index'
function Home() {
  const cleanwhat = 'all';
  const dispatch = useDispatch();
  dispatch(new onChatingId('home')); 
  return (
    <div>
	<AppBar cleanwhat={cleanwhat} />
	<ChatList/>
    </div>
  )
}

export default Home;
