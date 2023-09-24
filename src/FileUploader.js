import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useTranslation } from 'react-i18next';
import { compressImage } from './util';
import { pichub } from './extendrestfulserver';

function FileUploader({ open, setOpen, filetype,onFileUploaded }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const gethubimplement = (ftype) =>{
    if(ftype==='image/*')
	  return pichub.github;
  }
  const fileimghandle = (file) =>{
     setCompressing(true);
     const compressedImage = compressImage(file);
     compressedImage.then((compressedfile)=>{
	     const base64img = convertToBase64(compressedfile);
	     base64img.then((imgstr)=>{
     	             setCompressing(false);
     	     	     setLoading(true);
		     const hubmethod = gethubimplement(filetype);
		     const hubresult = hubmethod(imgstr.replace("data:image/jpeg;base64,", ""));
		     hubresult.then((imgcontent)=>{
			     const result = imgcontent.data;
			     setLoading(false);
			     if(result['err']!==undefined){
				 console.log(result['err']);
				 handleCancel();
			     }
			     else{
				     onFileUploaded(result['result']['download_url']);
				     handleCancel();

			     }


		     });
		     hubresult.catch((err)=>{
			     setLoading(false);
			     handleCancel();
			     console.log(err);
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
  const getMIME_types = (ftype) => {
    if(ftype==='image/*'){
	    return ['image/jpeg','image/png','image/webp','image/gif'];
    }
    return '*/*';

  }

  const mimetypes = getMIME_types(filetype);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,accept:filetype });

  return (
    <Dialog open={open}>
      <DialogTitle>{t('selectfile')}</DialogTitle>
      <DialogContent>
	{loading && <LinearProgress color="secondary" />}
	{compressing && <LinearProgress />}
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
