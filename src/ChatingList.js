import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChatingListItem  from './ChatingListItem';
import BottomAlignedList from './BottomAlignedList';
import { useEffect,useRef,useState } from 'react';
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect';
import { removeDuplicates } from './util';


export default function ChatingList({ channelid }) {
   const userId = useSelector((state)=>{return state.usrinfo.id});
   const view_cleanstr = useSelector((state)=>{return state.viewcleantime[channelid]});
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
		return removeDuplicates(mergedList);
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
    return (<ChatingListItem sendingitem={sendingitem} />)
  });

  return (
    <Box sx={{ overflowY: 'auto',display: 'flex',flexDirection: 'column',justifyContent: 'flex-end',flexGrow: 6, height:0, width: '100%', bottom: '20px', bgcolor: 'background.paper'}}>
      <BottomAlignedList sx={{ overflowY: 'auto'}}>
	  {SendingItems}
      </BottomAlignedList>
      <Divider />
      <Box height={5} width={'100%'} />
    </Box>
  );
}


