import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import ChatWith from './ChatWith';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect';


export default function BasicList() {
  const selectSendingReceived = createSelector(
  	state => {return state.sending;},
  	state => state.received,
  	(sending, received) => {
    	// 在这里组合和转换数组
		    
	  	    const sendingkeys = Object.keys(sending);
	  	    const receivedkeys = Object.keys(received);
	  	    const mergedidrepeat = sendingkeys.concat(receivedkeys); // 合并两个数组
	  	    const mergedid = Array.from(new Set(mergedidrepeat));
	  	    return mergedid;
  	}
  );
  const chatinglist = useSelector(selectSendingReceived); 

  //handle 
  const handleTouchStart = (event,touchStartX ) => {
  	touchStartX = event.touches[0].clientX; // 记录触摸起始位置的X坐标
  };
  const handleTouchEnd = (event, touchStartX, channelid) => {
  	if (touchStartX !== null) {
    		const touchEndX = event.changedTouches[0].clientX; // 获取触摸结束时的X坐标
    		const deltaX = touchEndX - touchStartX; // 计算滑动的水平距离
		console.log(deltaX);

    		if (deltaX < -50) {
      			// 水平距离小于-50时，认为是向左滑动，执行长按事件的处理逻辑
      			// 在这里编写处理长按事件的逻辑
      		  console.log('向左滑动，channelid:', channelid);
    		}
  	}

  	touchStartX = null; // 重置触摸起始位置的X坐标
  };
  const chatinglistwithnopublic = chatinglist.filter((channelid) => channelid !== 'public');


  const ChatingItems = chatinglistwithnopublic.map((channelid) => {
     let touchStartX = null;
     return (
          <ListItem key={channelid} disablePadding>
           <ListItemButton component="a" href={"/chat/"+channelid}  onTouchStart={(event)=>{handleTouchStart(event,touchStartX)} } onTouchEnd={(event)=>{ handleTouchEnd(event,touchStartX ,channelid)}} >
             <ListItemText>
                {channelid}
             </ListItemText>
           </ListItemButton>
          </ListItem>
    );
  });


  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/chat/public">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="公共聊天室" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
	  	<ChatWith />
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
	  {ChatingItems}
        </List>
      </nav>
    </Box>
  );
}


