import React, { useEffect, useRef,useState } from 'react';
import { List } from '@mui/material';

function BottomAlignedList({ children, ...props }) {
  const listRef = useRef(null);
  const [listHeight, setListHeight] = useState('95%');

  useEffect(() => {
    updateListHeight();
  }, [children]);

  const updateListHeight = () => {
    const listElement = listRef.current;
    if (listElement) {
      const containerHeight = listElement.parentElement.offsetHeight;
      const newHeight = listElement.offsetHeight <= containerHeight ? '95%' : '95%';
      setListHeight(newHeight);

    }
  };

  return (
    <List 
      ref={listRef} 
      sx={{
	height: {listHeight},
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflowY: 'auto',
      }}
      {...props}>
      {children}
    </List>
  );
}

export default BottomAlignedList;
