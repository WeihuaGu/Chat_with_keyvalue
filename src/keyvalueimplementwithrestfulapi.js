import axios from 'axios';
const baseurl = process.env.REACT_APP_PUSH_URL;
const token = process.env.REACT_APP_TOKEN;
const restfulurl = baseurl || 'https://test.com/xxx';

// 准备要发送的 JSON 数据
const data = {
  key1: 'value1',
  key2: 'value2',
};
// 设置自定义 Header
const headers = {
  token: token
};
const pushlisturl = (key) =>{
	const url = restfulurl+'/redis/push/chat/'+key;
	return url
}
const getlisturl = (key) =>{
	const url = restfulurl+'/redis/list/chat/'+key;
	return url
}
const getvalueurl = (key) =>{
	const url = restfulurl+'/redis/get/chat/'+key;
	return url
}
const setjsonurl = (key) =>{
	const url = restfulurl+'/redis/setjson/chat/'+key;
	return url
}

const getkeyvalue = (key)=>{
	const geted = axios.get(getvalueurl(key),{headers});
	return geted;
}
const setkeyjson = (key,msg)=>{
   const pushed = axios.post(setjsonurl(key),msg,{headers})
   return pushed;
}
const getlist = (key)=>{
	const geted = axios.get(getlisturl(key),{headers});
	return geted;
}

const pushtolist = (key,msg)=>{
   const pushed = axios.post(pushlisturl(key),msg,{headers})
   return pushed;
}

const restfulapimethod = {
	getlist:getlist,
	pushtolist:pushtolist,
	setkeyjson:setkeyjson,
	getkeyvalue:getkeyvalue
}

export { restfulapimethod  }
