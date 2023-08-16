import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { bottom } from '@material-ui/system';

import { useState, useEffect } from 'react';
export default function InputText({ onClick, setInputText }) {
  const [inputText, setInputTextLocal] = useState('');
  const handleInputChange = (event) => {
    setInputTextLocal(event.target.value);
    setInputText(event.target.value); // 更新父组件的状态
  };
  const handleButtonClick = () => {
	onClick();
	setInputTextLocal('');
};
  return (
      <Box sx={{
          bgcolor: 'background.paper',
          positon: bottom,
          Width: "100%",
          display: 'grid',
          gridAutoColumns: '1fr',
          gap: 1,
        }}>
	  <TextField id="sendtext" variant="outlined" value={inputText} onChange={handleInputChange}  multiline sx={{ gridRow: '1', gridColumn: '1 / 6' }}/>

	  <IconButton color="inherit" onClick={handleButtonClick} sx={{ gridRow: '1', gridColumn: '6 / 7' }}>
	  	<SendIcon fontSize="large" />
          </IconButton>
      </Box>
  );
}
