import { encrypt, decrypt} from './encrypt.js';
import { pushKeyValue ,pushToList,getKeyValue,getList,delKey } from './keyvalue.js';
import { getState,dispatch } from './util.js';
import { newDecryptMsg } from './actions/index.js';


const subscribeChannel = (channel,start=0,stop=-1)=>{
	return new Promise(async(resolve, reject) => {
		const clist = await getList(channel,start,stop);
		let infolist;
		if(channel!=='public')
			infolist = clist[Number(channel)];
		else
			infolist = clist[channel];
		if(infolist === undefined){
			reject();
			return;
		}
		const localdecryptdic = getState().decryptmsg;
		const decryptlist = infolist.map((itemstr)=>{
			const item = JSON.parse(itemstr);
			const type = item.type;
			const msgid = item.id;
			if(type === 'secret'){
				if(msgid in localdecryptdic){
                        	    const decryptedlocalmsg = localdecryptdic[msgid];
				    if(decryptedlocalmsg)
				    	return JSON.parse(decryptedlocalmsg);
                		}else{

					const enmsg = item.msg;
					const pass = item.encryptedpass;
					const enmsgobj = { 
						encryptedpass:pass, 
						encryptedcontent:enmsg
					}
					const decryptedmsg = decrypt(enmsgobj);
					dispatch(new newDecryptMsg(msgid,decryptedmsg));
					return JSON.parse(decryptedmsg);
				}
			}
			if(type === 'pub'){
				return item.msg;
			}
			return {};

		});
		resolve(decryptlist);
	});
}
const subscribeChannelOne = (channel,oneindex)=>{
   return subscribeChannel(channel,oneindex,oneindex);
}
const getchannelpubkey = async(channel) =>{
	const cinfostr = await subscribeChannelInfo(channel);
	if(cinfostr === undefined || cinfostr === null)
		return undefined;
	if(cinfostr['info-'+channel] === undefined || cinfostr['info-'+channel] === null)
		return undefined;
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
	  if(pubkey===undefined){
		pubkey = await getchannelpubkey(channel);
		if(pubkey === undefined){
			return new Promise((resolve, reject) => {
				reject('can not get receiver info');
			});

		}
	  }
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
const delChannel = (channel)=>{
	return new Promise((resolve, reject) => {
		resolve(delKey(channel));
	});
}

export { publisheChannel,subscribeChannel,subscribeChannelOne, publisheInfo2Channel,subscribeChannelInfo,delChannel,getchannelpubkey }

