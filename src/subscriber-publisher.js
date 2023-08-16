import { encrypt, decrypt, getEncryptedPass , getDecryptedPass} from './encrypt.js';
import { pushKeyValue } from './keyvalue.js';


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
	return pushKeyValue(channel,JSON.stringify(premsg));

}
export { publisheChannel }

