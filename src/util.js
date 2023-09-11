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

const printList = (list) => {
  list.forEach((item) => {
    console.log(item);
  });
};
const itemInList = (theitem,list,keyname)=>{
    const isItemInlist = list.some((item) => item[keyname] === theitem[keyname]);
    return isItemInlist;
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


export { getA_not_in_B, printList,itemInList,printState,getState,dispatch };
