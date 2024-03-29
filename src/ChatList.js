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


export default function BasicList() {
  const { t } = useTranslation();
  const userId = useSelector((state)=>{return state.usrinfo.id});
  const newalertid = useSelector((state)=>state.newalert);
  const chatingid = useSelector((state)=>{return state.onchatingid});
  const remarklist = useSelector((state)=>{return state.channelremark});
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


  const chatinglistwithnopublic = chatinglist.filter((channelid) => channelid !== 'public' && channelid !== userId);
  const ChatingItems = chatinglistwithnopublic.map((channelid) => {
     var hasNewMessage = (channelid === newalertid && chatingid!==newalertid);
     let hasRemark;
     if(remarklist[channelid]===undefined || remarklist[channelid]===undefined)
	  hasRemark=false;
     else
	  hasRemark=true;
     return (
          <ListItem key={channelid} disablePadding>
           <ListItemButton component="a" href={"/chat/"+channelid}>
	     {getRandomIcon()}
             <ListItemText>
                {channelid} {hasRemark && (<span>[{remarklist[channelid]}]</span>)}
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
            <ListItemButton component="a" href={"/chat/"+userId}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={t('note')} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
	  	<ChatWith />
          </ListItem>
        </List>
      </nav>
      <Divider />
      <List>
	  {ChatingItems}
      </List>
    </Box>
  );
}


