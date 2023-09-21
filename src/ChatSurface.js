import * as React from 'react';
import AppBar from './AppBar';
import Box from '@mui/material/Box';
import InputText from './InputText';
import ChatingList from './ChatingList';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { sendingMsg, sendedMsg , newAlert ,receivedPubMsg, onChatingId } from './actions/index';
import { publisheChannel } from './subscriber-publisher.js';
import { subscribeChannel,subscribeChannelInfo } from './subscriber-publisher.js';
import { getA_not_in_B, itemInList,getState } from './util';
import { cloneDeep } from 'lodash';



export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const { channelid } = useParams();
  const newalertid = useSelector((state)=>state.newalert);
  const chatingid = useSelector((state)=>{return state.onchatingid});
  const userId = useSelector((state)=>{return state.usrinfo.id});
  const fromId = useSelector((state)=>{return state.usrinfo.id});
  const [parentInputText, setParentInputText] = useState('');
  const [randomText, setRandomText] = useState('');
  const channelInfo = useRef({});
  const onin = useRef(true);


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
     else{
        if(channelInfo.current === null){
	     const sended = sendedMsg(channelid,postinfo.id,'failed');
	     dispatch(sended);
	     return;
	}
	if(channelInfo.current['pubkey']!==undefined)
     		sendresult = publisheChannel(sendinginfo.toid,postinfo,'secret');
	else
     		sendresult = publisheChannel(sendinginfo.toid,postinfo,'secret',channelInfo.current['pubkey']);
     }
     sendresult.then((result)=>{
	     const sended = sendedMsg(channelid,result.id,'sended');
	     dispatch(sended);
	     console.log('send sucess');
	     console.log(result.id);
	     console.log(result.listnum);
     });
     sendresult.catch((err)=>{
	     const sended = sendedMsg(channelid,postinfo.id,'failed');
	     dispatch(sended);
     });

     
  }
  useEffect(() => {
    if(parentInputText!=='')
    	handleClick();
  }, [randomText,parentInputText]);

  useEffect(() => {
      onin.current = true;
      if(newalertid === chatingid && onin.current){
	if(newalertid!==0)
		dispatch(new newAlert(0));
      }
      return ()=>{
	 onin.current = false;
      }
  }, [chatingid]);

  useEffect(() => {
    dispatch(new onChatingId(channelid)); 

    if(channelid!=='public'){
    	const getchannelinfo = subscribeChannelInfo(channelid)
    	getchannelinfo.then((result)=>{
	    channelInfo.current = JSON.parse(result['info-'+channelid]);
	    if(channelInfo.current === undefined)
		channelInfo.current = {};

    	});
    }

    if(channelid==='public'){
      var times = 0;
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
	      const public_cleanstr = getState().incleantime[channelid];
	      let receivedlist;
	      if(public_cleanstr!==undefined){
	        const public_cleanTime = new Date(public_cleanstr);
	        receivedlist = receivedlistwithpublic.filter(obj => {
  			const objTime = new Date(obj.time);
  		        return objTime > public_cleanTime;
		});
	      }else{
		receivedlist = receivedlistwithpublic;
	      }
	      if(true){
		      if(localList===undefined){
			console.log('received list get null');
	      	        receivedlist.map((msg)=>{
			  dispatch(new receivedPubMsg(msg));
			  return msg.id;
	      	        });
		      }else{
		       const filterednewList =  getA_not_in_B(receivedlist,localList,'id');
	      	       filterednewList.map((msg)=>{
			    if(!itemInList(msg,localList,'id'))
				dispatch(new receivedPubMsg(msg));
			    return msg.id;
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
      <Box sx={{position: 'fixed',width:'100%' ,height:'100vh', display: 'flex',flexDirection: 'column' }}>
        <AppBar cleanwhat={channelid}/>
  	<ChatingList channelid={channelid}/>
  	<InputText  setRandomText={setRandomText} setInputText={setParentInputText} />
      </Box>
  );
}
