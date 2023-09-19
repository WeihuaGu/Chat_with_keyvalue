import { store } from './store'

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
	console.log(list);
	console.log('-----');
  const uniqueSet = new Set();
  const result = [];

  for (const obj of list) {
    if (!uniqueSet.has(obj.id)) {
      uniqueSet.add(obj.id);
      result.push(obj);
    }
  }
	console.log(result);
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
  var audioRegex = /^(http|https):\/\/.*\.(mp3|wav|ogg)(\?.*)?$/i;

  if (imageRegex.test(str)) {
    return 'image';
  } else if (audioRegex.test(str)) {
    return 'audio';
  } else {
    return 'text';
  }
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


export { determineType,removeDuplicates,getA_not_in_B, printList,itemInList,printState,getState,dispatch };
