import React, { useEffect, useRef,useState } from 'react';
import Box from '@mui/material/Box';
import { List } from '@mui/material';

function BottomAlignedList({ children, ...props }) {
  const listRef = useRef(null);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [children]);


  return (
    <Box sx={{ overflowY: 'auto'}}
         ref={listRef} 
    >
    <List 
      sx={{justifyContent: 'flex-end'}}
      {...props}
    >
      {children}
    </List>
    </Box>
  );
}

export default BottomAlignedList;
