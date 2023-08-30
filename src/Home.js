import React from 'react';
import ChatList from './ChatList';
import AppBar from './AppBar';
function Home() {
  const cleanwhat = 'all';
  return (
    <div>
	<AppBar cleanwhat={cleanwhat} />
	<ChatList/>
    </div>
  )
}

export default Home;
