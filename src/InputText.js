import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export default function InputText({ onClick, setInputText }) {
  const boxid = "inputbox";
  const [inputText, setInputTextLocal] = useState('');
  const delayedSetInputText = debounce(setInputText, 300); // 延迟 500 毫秒
  const handleInputChange = useCallback((event) => {
    setInputTextLocal(event.target.value);
    delayedSetInputText(event.target.value); // 更新父组件的状态
  },[setInputTextLocal,delayedSetInputText]);
  const handleButtonClick = useCallback(() => {
	onClick();
	setInputTextLocal('');
  },[onClick,setInputTextLocal]);
  const scrollToView = useCallback(() => {
    const curEl = document.getElementById(boxid)
    curEl.style.overflow = 'auto';
    curEl.scrollIntoView(false)
  },[]);
  useEffect(()=>{
	  //scrollToView();
  },[inputText]
  );
  return (
      <Box 
	sx={{
	position: 'sticky',
        bottom: '20px',
        width: '100%',
        bgcolor: 'background.paper',
        alignItems: 'center',
        padding: '10px',
	display: 'grid',
        gridAutoColumns: '1fr',
        gap: 1,
      }}
	  id={boxid}
	  >
	  <TextField id="sendtext" variant="outlined" value={inputText} onChange={handleInputChange}  multiline sx={{ gridRow: '1', gridColumn: '1/12' }}/>

	  <Button onClick={handleButtonClick} sx={{ gridRow: '1', gridColumn: '12/15',color:'#ab003c' }}>
	     发送
          </Button>
	  <Box sx={{ gridRow: '1', gridColumn: '15/16' }}>
          </Box>

      </Box>
  );
}
