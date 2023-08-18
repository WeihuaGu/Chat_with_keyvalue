import { redismethod } from './keyvalueimplement.js';
const pushKeyValue = (key,value)=>{
	const haha = JSON.stringify(value);
	return value.id;

}
const pushToList = (key,value)=>{
	const pushstr = JSON.stringify(value);
	return new Promise((resolve,reject)=>{
		const result = redismethod.pushtolist(key,pushstr);
		result.then((result)=>resolve(value.id)).catch((err)=>reject(err));
	});

}


export { pushKeyValue,pushToList  }
