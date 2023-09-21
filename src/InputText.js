import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import stringRandom from 'string-random';
import { lastSendTime } from './actions/index';
import { useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { convertText } from './util';

export default function InputText({ setInputText,setRandomText }) {
  const onchatingid = useSelector((state)=>{return state.onchatingid});
  const userId = useSelector((state)=>{return state.usrinfo.id});
  const { t } = useTranslation();
  const boxid = "inputbox";
  const ref_input = useRef('');
  const dispatch = useDispatch();
  const handleButtonClick = () => {
	if(onchatingid!==userId)
	    dispatch(new lastSendTime());
	setRandomText(stringRandom(5));
	//const sstr = convertText(ref_input.current.value);
	const sstr = ref_input.current.value;
	setInputText(sstr);
	ref_input.current.value='';
	ref_input.current.focus();
  }
	
  const isControlKeyPressed = useRef(false);
  // 处理键盘按下事件
  const handleKeyDown = (event) => {
    if (event.key === 'Control') {
	isControlKeyPressed.current = true;
    } else if (event.key === 'Enter' && isControlKeyPressed.current) {
    	handleButtonClick(); // 调用发送消息的函数
    }
  };
  // 处理键盘释放事件
  const handleKeyUp = (event) => {
    if (event.key === 'Control') {
	isControlKeyPressed.current = false;
    }
  };

  return (
      <Box 
	sx={{
	flexGrow: 1,
        bottom: '5px',
        width: '100%',
        bgcolor: 'background.paper',
        alignItems: 'center',
	display: 'grid',
        gridAutoColumns: '1fr',
        gap: 1,
        }}
	  id={boxid}
       >
	  <TextField inputRef={ref_input} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} variant="outlined" multiline sx={{ gridRow: '1', gridColumn: '1/12' }}/>

	  <Button onClick={handleButtonClick} sx={{ gridRow: '1', gridColumn: '12/15',color:'#ab003c' }}>
	    {t('send')}
          </Button>
	  <Box sx={{ gridRow: '1', gridColumn: '15/16' }}>
          </Box>

      </Box>
  );
}
