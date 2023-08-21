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


export { getA_not_in_B, printList,itemInList  };
