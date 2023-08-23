import React from 'react'; 
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux'
import { usrInfo, newUsrInfo,receivedMsg } from './actions/index';
import { genuserinfo } from './genuserinfo';
import { publisheInfo2Channel,subscribeChannel } from './subscriber-publisher.js';
import App from './App';
import ChatSurface from './ChatSurface';
import { printList,getState, getA_not_in_B,itemInList } from './util.js';
import { cloneDeep } from 'lodash';

function router(){
const dispatch = useDispatch();
const userId = useSelector((state)=>{return state.usrinfo.id});
useEffect(() => {
    var storedUserId = localStorage.getItem('userId');
    var storedPublicKey = localStorage.getItem('publicKey');
    let storedPrivateKey;
    let channelinfo;
    if (storedUserId && storedPublicKey) {
      const u_info = {
	      id: storedUserId,
	      pubkey: storedPublicKey
      }
      channelinfo = u_info;
      dispatch(new usrInfo(u_info)); 
    }
    else{
	    const info = genuserinfo();
	    storedUserId = info.id;
	    storedPublicKey =info.keypair.publickey;
	    storedPrivateKey = info.keypair.privatekey;
    	    localStorage.setItem('userId',storedUserId);
    	    localStorage.setItem('publicKey',storedPublicKey);
    	    localStorage.setItem('privateKey',storedPrivateKey);
      	    const u_info = {
	      id: storedUserId,
	      pubkey: storedPublicKey
            }
	    channelinfo = u_info;
	    dispatch(new newUsrInfo(u_info));
    }
    const pubinfo = publisheInfo2Channel(channelinfo.id,channelinfo);
    pubinfo.then((result)=>console.log('update usrinfo to server'));

    var times = 0;
    const interval = setInterval(() => {
      // 在这里执行接收消息的逻辑
      times=times+1;
      console.log('loop ...'+times);

      const mymsglist = subscribeChannel(userId);
              //很大的坑 上面useSelector获取的状态不是新的，时常获取到undefined
        const rawlocalList = getState().received;
        const localList = cloneDeep(rawlocalList);
	delete localList.public;

	
        mymsglist.then((list)=>{
              //过滤掉fromid=usrid的就行,这样就不显示自己已经发过了的
              const receivedlist = list.filter((msg) => msg.fromid !==userId );
              if(true){
		      const mergedLocal = [].concat(...Object.values(localList));
		      if(localList===undefined){
                        console.log('received list get null');
                        receivedlist.map((msg)=>{
                          dispatch(new receivedMsg(msg));
                        });
                      }else{
                       const filterednewList =  getA_not_in_B(receivedlist,mergedLocal,'id');
                       filterednewList.map((msg)=>{
                            if(!itemInList(msg,mergedLocal,'id'))
                                dispatch(new receivedMsg(msg));
                       });

                      }



              }
        });

	    

	    


    }, 6000); // 每5秒轮询一次

    return () => {
      // 清理函数在组件卸载时会被调用
      // 在这里清除轮询定时器或取消其他轮询相关的操作
            console.log('Stop polling');
	    clearInterval(interval);
    };
  }, []);

return (
<Router>
<Routes>
    <Route path="/" element={<App />} />
    <Route path="/chat/:channelid" element={<ChatSurface />} />
</Routes>
</Router>);
}

export default router;
