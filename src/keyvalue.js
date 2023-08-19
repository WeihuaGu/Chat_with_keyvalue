//import { redismethod } from './keyvalueimplementwithredis.js'; 如使用redis来存取key value
import { restfulapimethod } from './keyvalueimplementwithrestfulapi.js';
const pushKeyValue = (key,value)=>{
	const pushstr = JSON.stringify(value);
	return new Promise((resolve,reject)=>{
		const result = restfulapimethod.setkeyjson(key,pushstr);
		result.then((result)=>resolve(result.data)).catch((err)=>reject(err));
	});

}
const getKeyValue = (key)=>{
	return new Promise((resolve,reject)=>{
		const result = restfulapimethod.getkeyvalue(key);
		result.then((result)=>resolve(result.data)).catch((err)=>reject(err));
	});




}
const pushToList = (key,value)=>{
	const pushstr = JSON.stringify(value);
	return new Promise((resolve,reject)=>{
		const result = restfulapimethod.pushtolist(key,pushstr);
		result.then((result)=>resolve(result.data)).catch((err)=>reject(err));
	});

}
const getList = (key)=>{
	return new Promise((resolve,reject)=>{
		const result = restfulapimethod.getlist(key);
		result.then((result)=>resolve(result.data)).catch((err)=>reject(err));
	});




}


export { pushKeyValue,getKeyValue,pushToList,getList  }
