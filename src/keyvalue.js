import { restfulapimethod } from './keyvalueimplementwithrestfulapi.js';
const  apimethod = restfulapimethod;
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
const getList = (key,start=0,stop=-1)=>{
	return new Promise((resolve,reject)=>{
		const result = apimethod.getlist(key,start,stop);
		result.then((result)=>resolve(result.data)).catch((err)=>reject(err));
	});

}
const delKey = (key)=>{
	return new Promise((resolve,reject)=>{
		const result = apimethod.delkey(key);
		result.then((result)=>resolve(result.data)).catch((err)=>reject(err));
	});
}



export { pushKeyValue,getKeyValue,pushToList,getList,delKey  }
