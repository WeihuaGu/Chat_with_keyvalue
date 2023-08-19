import { encrypt, decrypt, getEncryptedPass , getDecryptedPass} from './encrypt.js';
import { pushKeyValue ,pushToList,getKeyValue,getList } from './keyvalue.js';


const subscribeChannel = (channel)=>{
	return new Promise(async(resolve, reject) => {
		const clist = await getList(channel);
		const infolist = clist[Number(channel)];
		const decryptlist = infolist.map((itemstr)=>{
			const haha = itemstr.replace(/\\"/g, '"').slice(1, -1).slice(1, -1);
			console.log(haha);
			console.log(typeof haha);
			const item = JSON.parse(haha);
			const itemmsg = item['msg'];
			const pass = itemmsg['encryptedpass'];
			const content = decrypt(itemmsg['encryptedcontent']);
			return content;
		});
		resolve(decryptlist);
	});
}
const getchannelpubkey = async(channel) =>{
	const cinfostr = await subscribeChannelInfo(channel);
	const cinfo = JSON.parse(cinfostr['info-'+channel])
	return cinfo.pubkey;

}
const publisheChannel = async(channel,msg,type)=>{
	const pubkey = await getchannelpubkey(channel);
	let premsg;
	if(type === 'secret'){
		// 加密数据
	  const encryptedData = encrypt(JSON.stringify (msg),pubkey);
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
		pushresult.then((result)=>{
		const pushed = {
			id: premsg.id,
			listnum: result.result
		}
		resolve(pushed);
		}).catch((err)=>reject(err));
	});

}
const subscribeChannelInfo = (channel)=>{
	return new Promise((resolve, reject) => {
		resolve(getKeyValue('info-'+channel));
	});


}
const publisheInfo2Channel = (channel,msg)=>{
	return new Promise((resolve, reject) => {
		resolve(pushKeyValue('info-'+channel,msg));
	});

}
export { publisheChannel,subscribeChannel, publisheInfo2Channel,subscribeChannelInfo }

