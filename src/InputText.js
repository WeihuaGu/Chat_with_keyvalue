import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { bottom } from '@material-ui/system';

export default function InputText() {
  return (
      <Box sx={{
          bgcolor: 'background.paper',
          positon: bottom,
          Width: "100%",
          display: 'grid',
          gridAutoColumns: '1fr',
          gap: 1,
        }}>
	  <TextField id="sendtext" variant="outlined" multiline sx={{ gridRow: '1', gridColumn: '1 / 6' }}/>

	  <IconButton color="inherit" component="a" href="/" sx={{ gridRow: '1', gridColumn: '6 / 7' }}>
	  	<SendIcon fontSize="large" />
          </IconButton>
      </Box>
  );
}
