import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import stringRandom from 'string-random';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function InputText({ setInputText,setRandomText }) {
  const { t } = useTranslation();
  const boxid = "inputbox";
  const ref_input = useRef('');
  const handleButtonClick = () => {
	setRandomText(stringRandom(30));
	setInputText(ref_input.current.value);
	ref_input.current.value='';
  }
  return (
      <Box 
	sx={{
	position: 'sticky',
        bottom: '10px',
        width: '100%',
        bgcolor: 'background.paper',
        alignItems: 'center',
        padding: '10px',
	display: 'grid',
        gridAutoColumns: '1fr',
        gap: 1,
      }}
	  id={boxid}
	  >
	  <TextField inputRef={ref_input} variant="outlined"  multiline sx={{ gridRow: '1', gridColumn: '1/12' }}/>

	  <Button onClick={handleButtonClick} sx={{ gridRow: '1', gridColumn: '12/15',color:'#ab003c' }}>
	    {t('send')}
          </Button>
	  <Box sx={{ gridRow: '1', gridColumn: '15/16' }}>
          </Box>

      </Box>
  );
}
