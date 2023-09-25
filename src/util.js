import { store } from './store'
import imageCompression from 'browser-image-compression';
import Resizer from 'react-image-file-resizer';



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
	// Emoji Cheat Sheet 正则表达式
  const emojiRegex = /^:.+?:$/;

  if (imageRegex.test(str)) {
    return 'image';
  } else if (audioRegex.test(str)) {
    return 'audio';
  } else if (videoRegex.test(str)) {
    return 'video';
  } else if (emojiRegex.test(str)) {
    return 'emoji';
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
          resolve(compressedFile);
        },
        'blob'
      );
  });
};

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


export { compressImage,convertText,determineType,removeDuplicates,getA_not_in_B, printList,itemInList,printState,getState,dispatch };
