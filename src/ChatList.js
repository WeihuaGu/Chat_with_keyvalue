import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChatWith from './ChatWith';
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { iconsArray } from './faceiconarray';
import { removeDuplicates } from './util';


export default function BasicList() {
  const { t } = useTranslation();
  const newalertid = useSelector((state)=>state.newalert);
  const chatingid = useSelector((state)=>{return state.onchatingid});
  const selectSendingReceived = createSelector(
  	state => state.sending,
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

  const getRandomIcon = () => {
   const randomIndex = Math.floor(Math.random() * iconsArray.length);
   const RandomIcon = iconsArray[randomIndex];
   return <RandomIcon style={{ marginRight: '8px' }}/>;
  };


  const chatinglistwithnopublic = removeDuplicates(chatinglist.filter((channelid) => channelid !== 'public'));
  const ChatingItems = chatinglistwithnopublic.map((channelid) => {
     var hasNewMessage = (channelid === newalertid && chatingid!==newalertid);
     return (
          <ListItem key={channelid} disablePadding>
           <ListItemButton component="a" href={"/chat/"+channelid}>
	     {getRandomIcon()}
             <ListItemText>
                {channelid}
             </ListItemText>
	     {hasNewMessage && (
            		<span style={{ color: 'green', marginLeft: '1px' }}>
              		<FiberManualRecordIcon fontSize="small" />
            		</span>
             )}
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
              <ListItemText primary={t('publicchat')} />
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


