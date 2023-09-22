import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

export default function FormDialog({open,setOpen,title,content_text,success,err}) {
  const { t } = useTranslation();
  const ref_input = useRef('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSuccessClose = () => {
    setOpen(false);
    if(success)
      success(ref_input.current.value);
  };
  const handleErrClose = () => {
    setOpen(false);
    if(err)
     err();
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
	  {content_text}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
	    inputRef={ref_input}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrClose}>{t('cancel')}</Button>
          <Button onClick={handleSuccessClose}>{t('ok')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
