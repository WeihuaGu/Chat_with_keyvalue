import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import stringRandom from 'string-random';
import { useState } from 'react';
import EmojiPicker   from 'emoji-picker-react';
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const dispatch = useDispatch();
  const handleButtonClick = () => {
	if(onchatingid!==userId)
	    dispatch(new lastSendTime());
	setRandomText(stringRandom(5));
	const str = ref_input.current.value;
	const cstr = convertText(str);
	setInputText(cstr);
	ref_input.current.value='';
	ref_input.current.focus();
  }
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
    ref_input.current.focus();
    // 将选中的表情插入到输入框光标位置
    const startPos = ref_input.current.selectionStart;
    const endPos = ref_input.current.selectionEnd;
    const input = ref_input.current;
    const textBefore = input.value.substring(0, startPos);
    const textAfter = input.value.substring(endPos, input.value.length);
    const insertedText = emoji.emoji; // 或者根据需要获取表情的其他属性
    const newText = textBefore + insertedText + textAfter;
    input.value = newText;
    // 触发输入框的 change 事件
    const inputEvent = new Event('input', { bubbles: true });
    input.dispatchEvent(inputEvent);
  }; 
	
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
    if (event.target.value.endsWith('/emo')) {
    	setShowEmojiPicker(true);
    	event.target.value = event.target.value.slice(0, -4);
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
	  {showEmojiPicker && (
 	     <EmojiPicker onEmojiClick={handleEmojiSelect} />
	  )}

      </Box>
  );
}
