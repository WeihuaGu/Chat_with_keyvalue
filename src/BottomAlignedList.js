import React, { useEffect, useRef,useState } from 'react';
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
    <List 
      sx={{justifyContent: 'flex-end'}}
      ref={listRef} 
      {...props}
    >
      {children}
    </List>
  );
}

export default BottomAlignedList;
