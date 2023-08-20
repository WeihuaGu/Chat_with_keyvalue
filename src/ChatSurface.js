import * as React from 'react';
import AppBar from './AppBar';
import Box from '@mui/material/Box';
import InputText from './InputText';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ChatingList from './ChatingList';
import { position } from '@material-ui/system';
import { bottom } from '@material-ui/system';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { sendingMsg, sendedMsg } from './actions/index';
import { publisheChannel } from './subscriber-publisher.js';
import { subscribeChannel } from './subscriber-publisher.js';

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const { channelid } = useParams();
  const fromId = useSelector((state)=>{return state.usrinfo.id});
  const [parentInputText, setParentInputText] = useState('');

  const handleClick = () => {
     const sendinginfo = {
       fromid:fromId,
       toid:channelid,
       text:parentInputText,
       msgstatus:'sending'
       }
     const sendingaction = sendingMsg(sendinginfo);
     dispatch(sendingaction);
     let sendresult;
     if(sendinginfo.toid==='public')
     	sendresult = publisheChannel(sendinginfo.toid,sendinginfo,'pub');
     else
     	sendresult = publisheChannel(sendinginfo.toid,sendinginfo,'secret');
     sendresult.then((result)=>{
	     console.log('send sucess');
	     console.log(result.id);
	     console.log(result.listnum);
     });
     
  }
  useEffect(() => {
    if(channelid==='public'){
      var times = 0;
      const interval = setInterval(() => {
      // 在这里执行接收public消息的逻辑
       times=times+1;

      console.log('loop ...pub'+times);
      const mymsglist = subscribeChannel(channelid);
      mymsglist.then((list)=>{
	      //过滤掉fromid=usrid的就行
              console.log(list);
      });
    }, 6000); // 每5秒轮询一次

    return () => {
      // 清理函数在组件卸载时会被调用
      // 在这里清除轮询定时器或取消其他轮询相关的操作
            console.log('Stop polling');
            clearInterval(interval);
    };
   }



  }, []);
  return (
      <Box>
      <AppBar />
      <Stack spacing={2}>
  	<ChatingList channelid={channelid}/>
  	<InputText onClick={handleClick} setInputText={setParentInputText} sx={{bottom: bottom}} />
      </Stack>
      </Box>
  );
}
