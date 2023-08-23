import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Paper from '@mui/material/Paper';
import { useState, useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect';
import { sendingMsg, sendedMsg } from './actions/index';
import { getA_not_in_B, printList } from './util';


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
  if(view_cleanstr!=undefined){
             const cleanTime = new Date(view_cleanstr);
             listcleantimed = sendingandreceivedlist.filter(obj => {
                        const objTime = new Date(obj.time);
                        return objTime > cleanTime;
             });
  }else{
                 listcleantimed = sendingandreceivedlist;
  }

  

  const SendingItems = listcleantimed.map((sendingitem) => {
   let textAlignment = '';
   let listItemStyle = {};
	  let listItemColor = '';
   if (sendingitem.fromid === userId) {
    textAlignment = 'right';
    listItemStyle = { paddingLeft: '50px', paddingRight: '10px',
    backgroundColor: sendingitem.msgstatus === 'sending' ? '#87CEFA' : sendingitem.msgstatus === 'sended' ? '#eaeaea' : sendingitem.msgstatus === 'failed' ? '#ffcccc' : ''};
   } else {
    textAlignment = 'left';
	   listItemStyle = { paddingLeft: '10px', paddingRight: '50px' };
   }
   return (
          <ListItem key={sendingitem.id} disablePadding style={listItemStyle}>
	   <ListItemButton>
	     <ListItemText align={textAlignment}>
	   	{sendingitem.text}
	     </ListItemText>
	   </ListItemButton>
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
    <Box ref={chatListContainerRef} sx={{ maxHeight: 'calc(100% - 120px)',width: '100%', bgcolor: 'background.paper', 'flex-grow': 1, overflowY: 'auto' }}>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
	  {SendingItems}
        </List>
      </nav>
    </Box>
  );
}


