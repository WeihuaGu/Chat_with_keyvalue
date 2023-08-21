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
import { sendingMsg, sendedMsg ,receivedPubMsg ,genMd5} from './actions/index';
import { publisheChannel } from './subscriber-publisher.js';
import { subscribeChannel } from './subscriber-publisher.js';
import { getA_not_in_B, printList,itemInList } from './util';
import  CryptoJS from 'crypto-js';


export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const { channelid } = useParams();
  const userId = useSelector((state)=>{return state.usrinfo.id});
  const fromId = useSelector((state)=>{return state.usrinfo.id});
  const receivedList = useSelector((state)=>{return state.received.channelid});
  const pubcomparemd5 = useSelector((state)=>{return state.comparemd5.publicmd5});
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
     	sendresult = publisheChannel(sendinginfo.toid,sendingaction.info,'pub');
     else
     	sendresult = publisheChannel(sendinginfo.toid,sendingaction.info,'secret');
     sendresult.then((result)=>{
	     console.log('send sucess');
	     console.log(result.id);
	     console.log(result.listnum);
     });
     
  }
  useEffect(() => {
    var times = 0;

    if(channelid==='public'){
      const interval = setInterval(() => {
      // 在这里执行接收public消息的逻辑
      times=times+1;
      console.log('loop ...pub'+times);

      const mymsglist = subscribeChannel(channelid);
      mymsglist.then((list)=>{
	      console.log('haha get public list');
	      //过滤掉fromid=usrid的就行,这样就不显示自己已经发过了的
	      const receivedlistwithpublic = list.filter((msg) => msg.fromid !==userId );
	      const receivedstr = receivedlistwithpublic.toString();
              const md5Hash = CryptoJS.MD5(receivedstr).toString();
	      if(pubcomparemd5!=md5Hash){
		      console.log('haha in handle public list');
		      if(receivedList===undefined){
	      	        receivedlistwithpublic.map((msg)=>{
			  dispatch(new receivedPubMsg(msg));
	      	        });
		      }else{
		       const filterednewList =  getA_not_in_B(receivedlistwithpublic,receivedList,'id');
		       console.log('pring raw receive list,then local receivelist,then new list');
			  printList(receivedlistwithpublic);
			  console.log('-------------------------------------------');
			  printList(receivedList);
			  console.log('-------------------------------------------');
			  printList(filterednewList);
		
	      	       filterednewList.map((msg)=>{
			    if(!itemInList(msg,receivedList,'id'))
				dispatch(new receivedPubMsg(msg));
	      	       });

		      }
	              dispatch(new genMd5('pub',receivedlistwithpublic));
	      }
      });
    }, 20000); // 每5秒轮询一次

    return () => {
      // 清除轮询定时器
            console.log('Stop public channel polling');
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
