import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { compressImage } from './util';
import { pichub } from './extendrestfulserver';

function FileUploader({ open, setOpen, filetype,onFileUploaded }) {
  const { t } = useTranslation();
  const gethubimplement = (ftype) =>{
    if(ftype==='image/*')
	  return pichub.github;
  }
  const fileimghandle = (file) =>{
     const compressedImage = compressImage(file);
     compressedImage.then((compressedfile)=>{
	     const base64img = convertToBase64(compressedfile);
	     base64img.then((imgstr)=>{
		     const hubmethod = gethubimplement(filetype);
		     const hubresult = hubmethod(imgstr.replace("data:image/webp;base64,", ""));
		     hubresult.then((imgcontent)=>{
			     console.log(imgcontent.data);
			     const result = imgcontent.data;
			     if(result['err']!==undefined)
				 handleCancel();
			     else{
				     onFileUploaded(result['result']['download_url']);
				     handleCancel();

			     }


		     });
		     
	     })
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


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,accept: filetype });

  return (
    <Dialog open={open}>
      <DialogTitle>{t('selectfile')}</DialogTitle>
      <DialogContent>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {filetype==='image/*' ? <p>{t('selectpic')}</p> : <p>{t('selectfile')}</p>}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{t('cancel')}</Button>
      </DialogActions>
    </Dialog>
  );
}
export default FileUploader;
