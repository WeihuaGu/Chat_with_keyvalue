import { encrypt, decrypt, getEncryptedPass , getDecryptedPass} from './encrypt.js';
import { pushKeyValue ,pushToList,getKeyValue,getList } from './keyvalue.js';


const subscribeChannel = (channel)=>{
	return new Promise(async(resolve, reject) => {
		const clist = await getList(channel);
		let infolist;
		if(channel!='public')
			infolist = clist[Number(channel)];
		else
			infolist = clist[channel];
		const decryptlist = infolist.map((itemstr)=>{
			const item = JSON.parse(itemstr);
			const type = item.type;
			if(type === 'secret'){
				const enmsg = item.msg;
				const pass = item.encryptedpass;
				const enmsgobj = { 
					encryptedpass:pass, 
					encryptedcontent:enmsg
				}
				const decryptedmsg = decrypt(enmsgobj);
				return JSON.parse(decryptedmsg);
			}
			if(type === 'pub'){
				return item.msg;
			}

		});
		resolve(decryptlist);
	});
}
const getchannelpubkey = async(channel) =>{
	const cinfostr = await subscribeChannelInfo(channel);
	const cinfo = JSON.parse(cinfostr['info-'+channel])
	return cinfo.pubkey;

}
const publisheChannel = async(channel,msg,type,pubkey)=>{
	let premsg;
	if(type === 'pub'){
		premsg = {
			type:'pub',
			msg:msg,
			time: msg.time
		}
	}
	if(type === 'secret'){
	  if(pubkey===undefined)
		pubkey = await getchannelpubkey(channel);
	  // 加密数据
	  const encryptedData = encrypt(JSON.stringify (msg),pubkey);
	  premsg = {
		  type:'secret',
		  msg: encryptedData.encryptedcontent,
		  encryptedpass: encryptedData.encryptedpass,
		  time: msg.time

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
export { publisheChannel,subscribeChannel, publisheInfo2Channel,subscribeChannelInfo,getchannelpubkey }

