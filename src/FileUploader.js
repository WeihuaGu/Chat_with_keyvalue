import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useTranslation } from 'react-i18next';
import { compressImage } from './util';
import { pichub,textcontent } from './extendrestfulserver';

function FileUploader({ open, setOpen,uptype, filetype,onFileUploaded }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const gethubimplement = (ftype,uptype) =>{
    if(ftype==='image/*'){
	  if(uptype === 'pic')
	    return pichub.github;
	  if(uptype === 'tpic')
	    return textcontent.github;
    }
  }
  const fileimghandle = (file) =>{
     setCompressing(true);
     const compressedImage = compressImage(file);
     compressedImage.then((compressedfile)=>{
     	     setCompressing(false);
	     const base64img = convertToBase64(compressedfile);
	     base64img.then((imgstr)=>{
     	     	     setLoading(true);
		     const hubmethod = gethubimplement(filetype,uptype);
		     const hubresult = hubmethod(imgstr.replace(/data:image\/[^;]+;base64,/g, ""));
		     hubresult.then((imgcontent)=>{
			     const result = imgcontent.data;
			     setLoading(false);
			     if(result['err']!==undefined){
			         onFileUploaded(result['err'],'err');
				 handleCancel();
			     }
			     else{
				     if(uptype === 'pic')
				        onFileUploaded(result['result']['download_url'],'pic');
				     if(uptype === 'tpic')
				        onFileUploaded(result['result']['download_url'],'tpic');
				     handleCancel();

			     }


		     });
		     hubresult.catch((err)=>{
			     setLoading(false);
			     onFileUploaded(err,'err');
			     handleCancel();
		     });

		     
	     })
	     base64img.catch((err)=>{
		onFileUploaded(err,'err');
	        handleCancel();
	     });

     });
     compressedImage.catch((err)=>{
     	setCompressing(false);
	onFileUploaded(err,'err');
     });

  }
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if(filetype==='image/*'){
       fileimghandle(file);

    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const getMIME_types = (ftype) => {
    if(ftype==='image/*'){
	    return ['image/jpeg','image/png','image/webp','image/gif'];
    }
    return '*/*';

  }

  const mimetypes = getMIME_types(filetype);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,accept:filetype });
  const DialogTip = function(){
     if(filetype ==='image/*')
	  return (<Paper elevation={0}><CloudUploadOutlinedIcon /> {t('selectpic')}</Paper>);
     return (<Paper elevation={0}><CloudUploadOutlinedIcon /> {t('selectfile')}</Paper>);
  }
  return (
    <Dialog open={open}>
      <DialogTitle>{t('selectfile')}</DialogTitle>
      <DialogContent>
	{loading && <LinearProgress color="secondary" />}
	{compressing && <LinearProgress />}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
	  {!loading && (<DialogTip />)}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{t('cancel')}</Button>
      </DialogActions>
    </Dialog>
  );
}
export default FileUploader;
