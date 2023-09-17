import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { useEffect,useRef } from 'react';
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect';
import { determineType } from './util';


export default function ChatingList({ channelid }) {
   const userId = useSelector((state)=>{return state.usrinfo.id});
   const view_cleanstr = useSelector((state)=>{return state.viewcleantime[channelid]});
   const chatListContainerRef = useRef(null);
   const selectSendingAndReceived = createSelector(
        state => {return state.sending[channelid]},
        state => {return state.received[channelid]},
        (sending,received) => {
        // 在这里组合和转换数组
		const mergedList = [];
    		if (sending) 
    		  mergedList.push(...sending);
   		if (received) 
      		  mergedList.push(...received);
		mergedList.sort((a, b) => new Date(a.time) - new Date(b.time));
		return mergedList;
       }
  );
  const sendingandreceivedlist = useSelector(selectSendingAndReceived);
  
  let listcleantimed;
  if(view_cleanstr!==undefined){
             const cleanTime = new Date(view_cleanstr);
             listcleantimed = sendingandreceivedlist.filter(obj => {
                        const objTime = new Date(obj.time);
                        return objTime > cleanTime;
             });
  }else{
                 listcleantimed = sendingandreceivedlist;
  }

  

  const SendingItems = listcleantimed.map((sendingitem) => {
   const time = new Date(sendingitem.time);
   let textAlignment = '';
   let listItemStyle = {};
   const text_type = determineType(sendingitem.text);
   if (sendingitem.fromid === userId) {
    textAlignment = 'right';
    listItemStyle = { paddingLeft: '50px', paddingRight: '10px',
    backgroundColor: sendingitem.msgstatus === 'sending' ? '#87CEFA' : sendingitem.msgstatus === 'sended' ? '#eaeaea' : sendingitem.msgstatus === 'failed' ? '#ffcccc' : ''};
   } else {
    textAlignment = 'left';
    listItemStyle = { paddingLeft: '10px', paddingRight: '50px' };
   }
   let pressTimer = null;
   const handleMouseDown = () => {
  	pressTimer = setTimeout(() => {
    	// 在长按事件触发时执行的逻辑
    	handleCopyToClipboard();
    }, 1000); // 设置长按的时间阈值，单位为毫秒
   };

   const handleMouseUp = () => {
  	clearTimeout(pressTimer);
   };
   const handleCopyToClipboard = () => {
     navigator.clipboard.writeText(sendingitem.text)
    	.then(() => {
        console.log('Text copied to clipboard');
      // 在此处添加复制成功的逻辑
        })
        .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      // 在此处添加复制失败的逻辑
     });
   };

   return (
          <ListItem key={sendingitem.id} disablePadding style={listItemStyle}>
	   {text_type === 'text' && (<ListItemButton 
	   disableRipple={true}
	   onMouseDown={handleMouseDown}
           onMouseUp={handleMouseUp}>
	     <ListItemText align={textAlignment}>
	        <div style={{ display: 'block',userSelect: 'text' }}>
	   	<span>{sendingitem.text}</span>
	        <span> </span>
	        <Paper elevation={0} style={{ display: 'inline-block',padding: '5px',fontSize: '10px', color: 'gray',whiteSpace: 'nowrap' }}>
          	 {time.toLocaleTimeString([],{hour: '2-digit',minute: '2-digit',hour12: false})}
        	</Paper>
	        </div>
	     </ListItemText>
	   </ListItemButton>)}
	   {text_type === 'image' && (<div align={textAlignment}><img src={sendingitem.text} width={'45%'} height={'auto'} alt={sendingitem.text} /></div>)}
	   {text_type === 'audio' && (
           <div align={textAlignment}>
              <audio controls>
                  <source src={sendingitem.text} type="audio/mpeg" />
                  Your browser does not support the audio element.
              </audio>
           </div>)}
          </ListItem>
   );
  });

  const scrollToBottom = () => {
    if (chatListContainerRef.current) {
      chatListContainerRef.current.scrollTop = chatListContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [selectSendingAndReceived]);
  return (
    <Box ref={chatListContainerRef} sx={{ maxHeight: 'calc(100vh - 130px)',width: '100%', bottom: '20px', bgcolor: 'background.paper', flexGrow: 1, overflowY: 'auto' }}>
      <Divider />
      <List sx={{ height: '100%', display: 'flex', flexDirection: 'column',justifyContent: 'flex-end' }}>
	  {SendingItems}
      </List>
      <Box width={'100%'} height={20} />
    </Box>
  );
}


