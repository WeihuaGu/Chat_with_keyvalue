import React, { useState, useEffect } from 'react';
import { base64toBytes, getAESpassAndIv,aesDecrypt,aesDecryptFromBytes } from './encrypt';
import { encode, decode } from 'base-64';

const Base64Img = ({ sourceurl,width,height,onClick,style,setpicsrc }) => {
  const [imageData, setImageData] = useState('');
  const extend_aespass = process.env.REACT_APP_EXTEND_AESPASS;
  const handleClick = ()=>{
	  setpicsrc(`data:image/webp;base64,${imageData}`);
	  onClick();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(sourceurl);
	const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result;
          // 提取 base64 编码的图像数据部分
          const imageDataWithoutPrefix = dataUrl.replace('data:application/octet-stream;base64,', '');
	  if(extend_aespass){
	      const decryptedutf8 = decode(imageDataWithoutPrefix);
	      const passandiv = getAESpassAndIv(extend_aespass);
	      const sourceutf8 = aesDecrypt(decryptedutf8,passandiv.pass,passandiv.iv);
	      const base64img = encode(sourceutf8);
              setImageData(base64img);
	  }
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchData();
  }, [sourceurl]);

  return (
        <img src={`data:image/webp;base64,${imageData}`} alt="Base64 Image" width={width} height={height}  onClick={handleClick} style={style} />
  );
};

export default Base64Img;
