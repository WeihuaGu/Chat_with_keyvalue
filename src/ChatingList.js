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
import { sendingMsg, sendedMsg } from './actions/index';


export default function ChatingList({ channelid }) {
  const sendinglist = useSelector((state)=>{
	  if(channelid in state.sending){
	  	return state.sending[channelid]
	  }
	  else
		return [];
  });
  const SendingItems = sendinglist.map((sendingitem) => {
   return (
          <ListItem disablePadding>
	   <ListItemButton>
	     <ListItemText>
	   	{sendingitem.text}
	     </ListItemText>
	   </ListItemButton>
          </ListItem>
   );
  });
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
	  {SendingItems}
        </List>
      </nav>
    </Box>
  );
}


