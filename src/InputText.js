import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import stringRandom from 'string-random';
import { useState } from 'react';
import EmojiPicker   from 'emoji-picker-react';
import FileUploader from './FileUploader';
import { lastSendTime } from './actions/index';
import { useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { convertText,TPIC_MARK } from './util';

export default function InputText({ setInputText,setRandomText }) {
 
  const onchatingid = useSelector((state)=>{return state.onchatingid});
  const userId = useSelector((state)=>{return state.usrinfo.id});
  const { t } = useTranslation();
  const boxid = "inputbox";
  const ref_input = useRef('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [openfileup, setOpenfileup] = useState(false);
  const [imgfileup, setImgfileup] = useState(false);
  const [timgfileup, setTimgfileup] = useState(false);

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
  const onFileUploaded = (getedsource,uptype) => {
    const cdn_url = 'https://jsd.cdn.zzko.cn/gh/';
    const source = getedsource.replace("https://raw.githubusercontent.com/", "").replace("/main", "@main");
    const input = ref_input.current;
    input.value = cdn_url+source;
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
    if (event.target.value.endsWith('/emo')) {
    	setShowEmojiPicker(true);
    	event.target.value = event.target.value.slice(0, -4);
    }
    if (event.target.value.endsWith('/pic')) {
      if(process.env.REACT_APP_PICHUB_GITHUB_URL){
	setImgfileup(true);
    	setOpenfileup(true);
    	event.target.value = event.target.value.slice(0, -4);
      }
    }
    if (event.target.value.endsWith('/tpic')) {
      if(process.env.REACT_APP_PICHUB_GITHUB_URL){
	setTimgfileup(true);
    	setOpenfileup(true);
    	event.target.value = event.target.value.slice(0, -5);
      }
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
	  {imgfileup && (
		  <FileUploader filetype={'image/*'} uptype={'pic'} open={openfileup} setOpen={setOpenfileup} onFileUploaded={onFileUploaded} />
	  )}
	  {timgfileup && (
		  <FileUploader filetype={'image/*'} uptype={'tpic'} open={openfileup} setOpen={setOpenfileup} onFileUploaded={onFileUploaded} />
	  )}

      </Box>
  );
}
