import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

export default function ButtonAppBar() {
  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
	  <IconButton color="inherit" component="a" href="/">
	  	<HomeIcon />
          </IconButton>
	  <IconButton color="inherit">
	  	<AddIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      </Box>
  );
}
