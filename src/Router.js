import React from 'react'; 
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState,useEffect,useRef } from 'react';
import { useDispatch ,useSelector} from 'react-redux'
import { usrInfo, quickUsrInfoId, quickUsrInfoPubkey ,receivedMsg,inCleanTime } from './actions/index';
import { genuserinfo } from './genuserinfo';
import { publisheInfo2Channel,subscribeChannel } from './subscriber-publisher.js';
import Home from './Home';
import ChatSurface from './ChatSurface';
import MyToast from './MyToast';
import { getState, getA_not_in_B,itemInList } from './util.js';
import { cloneDeep } from 'lodash';

function router(){
const { i18n } = useTranslation();
const systemLanguage = useRef(navigator.language);
const dispatch = useDispatch();
const userId = useSelector((state)=>{return state.usrinfo.id});
const pubKey = useSelector((state)=>{return state.usrinfo.pubkey});
const chatingid = useSelector((state)=>{return state.onchatingid});
const [openToast, setOpenToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');
const [toastSeverity, setToastSeverity] = useState('info');

const handleOpenToast = (message, severity='info') => {
    setToastMessage(message);
    setToastSeverity(severity);
    setOpenToast(true);
  };
const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

//初始化
useEffect(() => {
    //初始化用户信息
    var storedUserId = localStorage.getItem('userId');
    var storedPublicKey = localStorage.getItem('publicKey');
    let storedPrivateKey;
    if (storedUserId && storedPublicKey) {
      const u_info = {
	      id: storedUserId,
	      pubkey: storedPublicKey
      }
      dispatch(new usrInfo(u_info)); 
    }
    else{
	    const usrinfogen = genuserinfo();
	    usrinfogen.id.then((theid)=>{
	        storedUserId = theid;
    	        localStorage.setItem('userId',storedUserId);
		dispatch(new quickUsrInfoId(theid));

	    });
	    usrinfogen.keypair.then((thekeypair)=>{
	        storedPublicKey =thekeypair.publickey;
	        storedPrivateKey = thekeypair.privatekey;
    	        localStorage.setItem('publicKey',storedPublicKey);
    	        localStorage.setItem('privateKey',storedPrivateKey);
		dispatch(new quickUsrInfoPubkey(storedPublicKey));
	    });
    }

    // 设置截止接收消息时间
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const public_cleantimestr = currentDate.toISOString();
    const public_cleantime = new inCleanTime('public',public_cleantimestr);
    if(getState().incleantime['public'] === undefined)
      dispatch(public_cleantime);

    const curDate = new Date();
    curDate.setDate(curDate.getDate() - 30);
    const me_cleantimestr = curDate.toISOString();
    const me_cleantime = new inCleanTime(userId,me_cleantimestr);
    if(getState().incleantime[userId] === undefined)
      dispatch(me_cleantime);

}, [pubKey]);

//发送自己频道信息
useEffect(() => {
    if(userId!==undefined && pubKey!==undefined){
      const u_info = {
	 id: userId,
	 pubkey: pubKey
      }
      const pubinfo = publisheInfo2Channel(u_info.id,u_info);
      pubinfo.then((result)=>console.log('update usrinfo to server'));
    }

}, [pubKey]);

//循环消息体
useEffect(() => {
    var times = 0;
    const interval = setInterval(() => {
      // 在这里执行接收消息的逻辑
      if(userId===undefined && pubKey===undefined){
	    return;
      }
      times=times+1;
      console.log('loop ...'+times);

        const mymsglist = subscribeChannel(userId);//很大的坑 上面useSelector获取的状态不是新的，时常获取到undefined
        const rawlocalList = getState().received;
        const localList = cloneDeep(rawlocalList);
	delete localList.public;
	
        mymsglist.then((list)=>{
              //过滤掉fromid=usrid的就行,这样就不显示自己已经发过了的
              const rawreceivedlist = list.filter((msg) => msg.fromid !==userId );
	      const time_cleanstr = getState().incleantime[userId];
              let receivedlist;
              if(time_cleanstr!==undefined){
                const cleanTime = new Date(time_cleanstr);
                receivedlist = rawreceivedlist.filter(msg => {
                        const msgTime = new Date(msg.time);
                        return msgTime > cleanTime;
                });
              }else{
                receivedlist = rawreceivedlist;
              }

              if(true){
		      const mergedLocal = [].concat(...Object.values(localList));
		      if(localList===undefined){
                        console.log('received list get null');
                        receivedlist.map((msg)=>{
                          dispatch(new receivedMsg(msg));
			  return msg.id
                        });
                      }else{
                       const filterednewList =  getA_not_in_B(receivedlist,mergedLocal,'id');
                       filterednewList.map((msg)=>{
                            if(!itemInList(msg,mergedLocal,'id')){
                                dispatch(new receivedMsg(msg));
				if(msg.fromid === chatingid){
				   console.log('新消息从:'+msg.fromid);
				   //handleOpenToast('新消息从:'+msg.fromid,'success');
				}
			    }
			    return msg.id
                       });

                      }

              }
        });
    }, 6000); // 每5秒轮询一次

    return () => {
            // 清除轮询定时器或取消其他轮询相关的操作
            console.log('Stop polling');
	    clearInterval(interval);
    };
}, []);

//国际化
useEffect(() => {
    i18n.changeLanguage(systemLanguage.current);
    document.title = i18n.t('app'); // 设置应用的标题
}, [systemLanguage]);

return (
<Router>
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/chat/:channelid" element={<ChatSurface />} />
</Routes>
	<MyToast
          open={openToast}
          onClose={handleCloseToast}
          message={toastMessage}
          severity={toastSeverity}
        />
</Router>);
}

export default router;
