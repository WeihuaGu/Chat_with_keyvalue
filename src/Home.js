import React from 'react';
import ChatList from './ChatList';
import AppBar from './AppBar';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux'
import { onChatingId } from './actions/index'
function Home() {
  const cleanwhat = 'all';
  const dispatch = useDispatch();
  dispatch(new onChatingId('home')); 
  return (
    <Box sx={{ position: 'fixed',top: 0,left: 0,width:'100%' ,height:'100vh', display: 'flex',flexDirection: 'column' }}>
	<AppBar cleanwhat={cleanwhat} />
	<ChatList/>
    </Box>
  )
}

export default Home;
