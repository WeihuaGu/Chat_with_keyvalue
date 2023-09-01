const methodtype = process.env.REACT_APP_METHON;
let apimethod;
if (methodtype === 'redis') {
  const { redismethod } = require('./keyvalueimplementwithredis.js');
  apimethod = redismethod;
} else if (methodtype === 'restfulapi') {
  const { restfulapimethod } = require('./keyvalueimplementwithrestfulapi.js');
  apimethod = restfulapimethod;
} else {
  console.error('Invalid method type');
}

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
