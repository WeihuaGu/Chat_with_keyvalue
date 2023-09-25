import React, { useState, useEffect } from 'react';

const Base64Img = ({ url,width,height,onClick,style }) => {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
	const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result;
          // 提取 base64 编码的图像数据部分
          const imageDataWithoutPrefix = dataUrl.replace('data:application/octet-stream;base64,', '');
	  console.log(imageDataWithoutPrefix); 
          setImageData(imageDataWithoutPrefix);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchData();
  }, [url]);

  return (
        <img src={`data:image/webp;base64,${imageData}`} alt="Base64 Image" width={width} height={height}  onClick={onClick} style={style} />
  );
};

export default Base64Img;
