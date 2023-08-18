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
     if(sendingaction.toid==='public')
     	sendresult = publisheChannel(sendinginfo.toid,sendinginfo,'pub');
     else
     	sendresult = publisheChannel(sendinginfo.toid,sendinginfo,'secret');
     sendresult.then((result)=>{
	     console.log('send sucess'+result);
     }
     );

     
     
  }
  useEffect(() => {

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
