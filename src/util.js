import { store } from './store'
import imageCompression from 'browser-image-compression';
import Resizer from 'react-image-file-resizer';

const TPIC_MARK = 'ZGXdgnwhFU';

const printState = () => {
  console.log('Current Store State:', store.getState());
}

const getA_not_in_B = (A, B, keyname) => {
  const resultlist = A.filter((itemA) => {
    const isItemAinB = B.some((itemB) => itemB[keyname] === itemA[keyname]);
    return !isItemAinB;
  });
  return resultlist;
};
function removeDuplicates(list) {
  const uniqueSet = new Set();
  const result = [];
  for (const obj of list) {
    if (!uniqueSet.has(obj.id)) {
      uniqueSet.add(obj.id);
      result.push(obj);
    }
  }
  return result;
}
const printList = (list) => {
  list.forEach((item) => {
    console.log(item);
  });
};
const itemInList = (theitem,list,keyname)=>{
    const isItemInlist = list.some((item) => item[keyname] === theitem[keyname]);
    return isItemInlist;
}

const determineType = (str)=> {
  var imageRegex = /^(http|https):\/\/.*\.(png|jpg|jpeg|gif|bmp|svg)(\?.*)?$/i;
  var audioRegex = /^(http|https):\/\/.*\.(mp3|wav|ape|ogg)(\?.*)?$/i;
  var videoRegex = /^(http|https):\/\/.*\.(mp4|avi|mov|flv)(\?.*)?$/i;
  var emojiRegex = /^:.+?:$/;
  var tpicRegex = new RegExp(`.*${TPIC_MARK}$`);

  if (imageRegex.test(str)) {
    return 'image';
  } else if (audioRegex.test(str)) {
    return 'audio';
  } else if (videoRegex.test(str)) {
    return 'video';
  } else if (emojiRegex.test(str)) {
    return 'emoji';
  } else if (tpicRegex.test(str)) {
    return 'tpic';
  } else {
    return 'text';
  }
}

const convertText = (text) => {
  const translations = {
    '笑脸': ':smile:',
    '微笑': ':smile:',
    '心形': ':heart:',
    '火箭': ':rocket:',
    '点赞': ':thumbsup:',
    '反对': ':thumbsdown:',
    '火焰': ':fire:',
    '星星': ':star:',
    '太阳': ':sunny:',
    '月亮': ':moon:',
    '云': ':cloud:',
    '彩虹': ':rainbow:',
    '雨伞': ':umbrella:',
    '咖啡': ':coffee:',
    '比萨': ':pizza:',
    '猫': ':cat:',
    '狗': ':dog:',
    '鸟': ':bird:',
    '乌龟': ':turtle:',
    '花朵': ':flower:'
  };

  const convertedText = text.replace(/\/(.+?)\b/g, (match, key) => {
    return translations[key] || match;
  });

  return convertedText;
}

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
      const originalSize = file.size;
      const maxWidth = 800;
      const maxHeight = 800;
      const quality = 80;
      const outputFormat = 'webp';


      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        outputFormat,
        quality,
        0,
        (compressedFile) => {
	  const compressedSize = compressedFile.size;
	   if (compressedSize > originalSize) {
              // 压缩成功
              resolve(compressedFile);
	   }else{
		   const options = {
    			maxSizeMB: 0.3,
    			maxWidthOrHeight: 900,
    			useWebWorker: false,
  		   }
		   const morecompressedFile = imageCompression(file, options);
	           morecompressedFile.then((finalcompress)=>{
	                console.log('the more compress');
			console.log(originalSize);
			console.log(finalcompress.size);
			if (finalcompress.size > originalSize)
			    resolve(finalcompress);
			else{
			    const grayimg = convertGray(file);
			    grayimg.then((img_gray)=>{
				    resolve(img_gray);
			    });
			    grayimg.catch((err)=>{
				    reject(err);
			    });
			}
		   });
		   morecompressedFile.catch((err)=>{
			reject(err);
		   });


	   }
        },
        'blob'
      );
  });
};
function convertGray(file) {
  return new Promise((resolve, reject) => {
    const originalSize = file.size;
    const grayScaleImage = new Image();
    grayScaleImage.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = grayScaleImage.width;
              canvas.height = grayScaleImage.height;
              const context = canvas.getContext('2d');
              context.drawImage(grayScaleImage, 0, 0);
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;
              for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg; // Red
                data[i + 1] = avg; // Green
                data[i + 2] = avg; // Blue
              }
              context.putImageData(imageData, 0, 0);
              canvas.toBlob((blob) => {
                    if (blob.size < originalSize) {
                      // 第3次压缩成功
                      resolve(blob);
                    } else {
                      reject('No compression achieved.');
                    }
              }, 'image/jpeg');
            }
   grayScaleImage.src = URL.createObjectURL(file);
  });

}
function printStoreState() {
  console.log('Current Store State:', store.getState())
}
function getState(){
  return store.getState();
}
function dispatch(action){
  return store.dispatch(action)
}

export default printStoreState


export { TPIC_MARK,compressImage,convertText,determineType,removeDuplicates,getA_not_in_B, printList,itemInList,printState,getState,dispatch };
