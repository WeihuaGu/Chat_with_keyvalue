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
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


export default function BasicList() {
  const chatinglist = useSelector((state)=>{
	  	    let chating;
	  	    const sendingkeys = Object.keys(state.sending);
	  	    console.log('main list');
	  	    console.log(sendingkeys);
	  	    const receivedkeys = Object.keys(state.received);
	  	    const mergedidrepeat = sendingkeys.concat(receivedkeys); // 合并两个数组
	  	    const mergedid = Array.from(new Set(mergedidrepeat));
	  	    return mergedid;
	    });
  const ChatingItems = chatinglist.map((channelid) => {
   return (
          <ListItem disablePadding>
           <ListItemButton>
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


