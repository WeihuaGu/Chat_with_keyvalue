import React from 'react'; 
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect,useRef } from 'react';
import { useDispatch ,useSelector} from 'react-redux'
import { usrInfo, quickUsrInfoId, quickUsrInfoPubkey,newAlert ,receivedMsg,inCleanTime } from './actions/index';
import { genuserinfo } from './genuserinfo';
import { publisheInfo2Channel,subscribeChannel,subscribeChannelOne } from './subscriber-publisher.js';
import Home from './Home';
import About from './About';
import ChatSurface from './ChatSurface';
import { getState, getA_not_in_B,itemInList } from './util.js';
import { cloneDeep } from 'lodash';

function router(){
const { i18n } = useTranslation();
const systemLanguage = useRef(navigator.language);
const dispatch = useDispatch();
const userId = useSelector((state)=>{return state.usrinfo.id});
const pubKey = useSelector((state)=>{return state.usrinfo.pubkey});
const chatingid = useSelector((state)=>{return state.onchatingid});
const lastsendtime = useSelector((state)=>{return state.lastsendtime});

const env_pollinginterval = process.env.REACT_APP_Polling_Interval;
const pollinginterval = env_pollinginterval || 5;
const skipCount = useRef(0);


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
		setTimeout(() => {
      			window.location.reload();
    		}, 1000);
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
      //跳过轮询的逻辑
      skipCount.current  =  skipCount.current + 1;
      if(userId===undefined && pubKey===undefined){
	    return;
      }
      var shouldSkipPolling = false;
      if(lastsendtime !== ''){
	const lastsendDate = new Date(lastsendtime);
	const now = new Date();
	// 计算时间差（以毫秒为单位）
	const timeDiff = now.getTime() - lastsendDate.getTime();
	const minutesDiff = Math.floor(timeDiff / (1000 * 60));
	if (minutesDiff > 15) 
	    shouldSkipPolling = true;
	else
	    shouldSkipPolling = false;
      }else
	shouldSkipPolling = true;
	    
      console.log('\n');
      console.log('should skip this: '+shouldSkipPolling);
      if (shouldSkipPolling && skipCount.current < 3) {
	console.log('skip this loop ...');
        return;
      }

      times=times+1;
      skipCount.current = 0;
      console.log('loop ...'+times);

      // 在这里执行接收消息的逻辑
      const rawlocalList = getState().received;
      const localList = cloneDeep(rawlocalList);
      delete localList.public;
      const oneremotepromise = subscribeChannelOne(userId,0,0);
      oneremotepromise.then((remotenewone)=>{
        const mergedLocal = [].concat(...Object.values(localList));
        const newone =  getA_not_in_B(remotenewone,mergedLocal,'id');
	var needgetall_flag=false;
	if(localList===undefined || newone.length>0)
		needgetall_flag = true;
	
	console.log('need get all list: '+needgetall_flag);
	if(needgetall_flag){
            const mymsglist = subscribeChannel(userId);//很大的坑 上面useSelector获取的状态不是新的，时常获取到undefined

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
              }else
                receivedlist = rawreceivedlist;

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
				if(msg.fromid !== chatingid){
				   console.log('新消息从:'+msg.fromid);
				   dispatch(new newAlert(msg.fromid));
				}
			    }
			    return msg.id
                       });

                    }

	   });
	 }
	 //check msg done
	
      });
    }, parseInt(pollinginterval)*1000); // 每5秒轮询一次

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
    <Route path="/about" element={<About />} />
</Routes>
</Router>);
}

export default router;
