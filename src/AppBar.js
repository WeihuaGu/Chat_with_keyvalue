import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';

import { useSelector, useDispatch } from 'react-redux'

export default function ButtonAppBar({}) {
  const userId = useSelector((state)=>{return state.usrinfo.id});
  
  return (
      <Box sx={{ flexGrow: 1,width: '100%',position: 'fixed',top: 0 }}>
      <AppBar position="static">
        <Toolbar>
	  <IconButton color="inherit" component="a" href="/">
	  	<HomeIcon />
          </IconButton>
	   <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
	    你的id: {userId}
          </Typography>
	  <IconButton color="inherit">
	  	<MoreVertIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      </Box>
  );
}
