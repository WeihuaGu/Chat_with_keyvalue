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
import { getA_not_in_B, printList,itemInList,printState,getState } from './util';
import  CryptoJS from 'crypto-js';
import { cloneDeep } from 'lodash';



export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const { channelid } = useParams();
  const userId = useSelector((state)=>{return state.usrinfo.id});
  const fromId = useSelector((state)=>{return state.usrinfo.id});
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
     const postinfo = cloneDeep(sendingaction.info);
     delete postinfo.msgstatus
     
     if(sendinginfo.toid==='public')
     	sendresult = publisheChannel(sendinginfo.toid,postinfo,'pub');
     else
     	sendresult = publisheChannel(sendinginfo.toid,postinfo,'secret');
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
	      //很大的坑 上面useSelector获取的状态不是新的，时常获取到undefined
      const localList = getState().received[channelid];
      mymsglist.then((list)=>{
	      //过滤掉fromid=usrid的就行,这样就不显示自己已经发过了的
	      const receivedlistwithpublic = list.filter((msg) => msg.fromid !==userId );
	      if(true){
		      if(localList===undefined){
			console.log('received list get null');
	      	        receivedlistwithpublic.map((msg)=>{
			  dispatch(new receivedPubMsg(msg));
	      	        });
		      }else{
		       const filterednewList =  getA_not_in_B(receivedlistwithpublic,localList,'id');
	      	       filterednewList.map((msg)=>{
			    if(!itemInList(msg,localList,'id'))
				dispatch(new receivedPubMsg(msg));
	      	       });

		      }
	      }
      });
    }, 10000); // 每5秒轮询一次

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
