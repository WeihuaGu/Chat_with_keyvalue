import { redismethod } from './keyvalueimplementwithredis.js'; 如使用redis来存取key value
import { restfulapimethod } from './keyvalueimplementwithrestfulapi.js';
const methodtype = process.env.REACT_APP_METHON;
let apimethod;
if(methodtype === 'redis')
	apimethod = redismethod;
if(methodtype === 'restfulapi')
	apimethod = restfulapimethod;
const pushKeyValue = (key,value)=>{
	return new Promise((resolve,reject)=>{
		const result = apimethod.setkeyjson(key,value);
		result.then((result)=>resolve(result.data)).catch((err)=>reject(err));
	});

}
const getKeyValue = (key)=>{
	return new Promise((resolve,reject)=>{
		const result = apimethod.getkeyvalue(key);
		result.then((result)=>resolve(result.data)).catch((err)=>reject(err));
	});




}
const pushToList = (key,value)=>{
	return new Promise((resolve,reject)=>{
		const result = apimethod.pushtolist(key,value);
		result.then((result)=>resolve(result.data)).catch((err)=>reject(err));
	});

}
const getList = (key)=>{
	return new Promise((resolve,reject)=>{
		const result = apimethod.getlist(key);
		result.then((result)=>resolve(result.data)).catch((err)=>reject(err));
	});




}


export { pushKeyValue,getKeyValue,pushToList,getList  }
