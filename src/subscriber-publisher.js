import { encrypt, decrypt, getEncryptedPass , getDecryptedPass} from './encrypt.js';
import { pushKeyValue ,pushToList } from './keyvalue.js';


const subscribeChannel = (channel)=>{
}
const publisheChannel = (channel,msg,type)=>{
	let premsg;
	if(type == 'secret'){
		// 加密数据
	  const encryptedData = encrypt(JSON.stringify (msg));
	  premsg = {
		  type:'secret',
		  msg: encryptedData
	  }
	}else{
		premsg = {
			type:'pub',
			msg:msg
		}
	}
	premsg['id'] = msg.id;
	return new Promise((resolve, reject) => {
		const pushresult = pushToList(channel,premsg);
		pushresult.then((result)=>resolve(result)).catch((err)=>reject(err));
	});

}
const publisheInfo2Channel = (channel,msg,type)=>{
	let premsg;
	if(type == 'secret'){
		// 加密数据
	  const encryptedData = encrypt(JSON.stringify (msg));
	  premsg = {
		  type:'secret',
		  msg: encryptedData
	  }
	}else{
		premsg = {
			type:'pub',
			msg:msg
		}
	}
	premsg['id'] = msg.id;
	return new Promise((resolve, reject) => {
		resolve(pushKeyValue(channel,premsg));
	});

}
export { publisheChannel,publisheInfo2Channel}

