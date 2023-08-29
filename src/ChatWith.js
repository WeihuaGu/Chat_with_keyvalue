import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';
export default function ChatWith({}) {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const handleInputChange = (event) => {
    setInputText(event.target.value); 
  };
  return (
      <Box sx={{
          bgcolor: 'background.paper',
          width: "100%",
          display: 'grid',
          alignItems: 'center',
          padding: '10px',
          gridAutoColumns: '1fr',
          gap: 1,
        }}>
	  <TextField id="channelid" variant="outlined" value={inputText} onChange={handleInputChange} sx={{ gridRow: '1', gridColumn: '1 / 6' }}/>

	  <Button color="inherit" component="a" href={"/chat/"+inputText} sx={{ gridRow: '1', gridColumn: '6 / 7' }}>
	  {t('chat')}
          </Button>
      </Box>
  );
}
