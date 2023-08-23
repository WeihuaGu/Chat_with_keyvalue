import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { bottom } from '@material-ui/system';

import { useState, useEffect } from 'react';
export default function ChatWith({}) {
  const [inputText, setInputText] = useState('');
  const handleInputChange = (event) => {
    setInputText(event.target.value); 
  };
  const handleButtonClick = () => {
	setInputText('');
};
  return (
      <Box sx={{
          bgcolor: 'background.paper',
          width: "100%",
          display: 'grid',
          alignItems: 'center',
          padding: '10px',
          gridAutoColumns: '1fr',
          gap: 1,
        }}>
	  <TextField id="channelid" variant="outlined" value={inputText} onChange={handleInputChange} sx={{ gridRow: '1', gridColumn: '1 / 6' }}/>

	  <Button color="inherit" component="a" href={"/chat/"+inputText} sx={{ gridRow: '1', gridColumn: '6 / 7' }}>
	  聊天
          </Button>
      </Box>
  );
}
