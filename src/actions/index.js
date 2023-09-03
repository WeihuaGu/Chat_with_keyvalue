import { v4 as uuidv4 } from 'uuid';
import  CryptoJS from 'crypto-js';

// 将消息保存在你的应用中
const commonaction = (type,info) =>{
	const messageId = uuidv4();
	const currentTime = new Date().toISOString();
	info['id'] = messageId;
	info['time'] = currentTime;

	const action = {
		type: type,
		info: info
	}
	return action;
}
const usrInfo = (info) =>{
	const action = {
		type: 'usrinfo',
		info: info
	}
	return action;
}

const newUsrInfo = (info) =>{
	const action = {
		type: 'newusrinfo',
		info: info
	}
	return action;
}
const quickUsrInfoId = (id) =>{
	const action = {
		type: 'quickusrinfoid',
		id: id
	}
	return action;
}
const quickUsrInfoPubkey = (pubkey) =>{
	const action = {
		type: 'quickusrinfopubkey',
		pubkey: pubkey
	}
	return action;
}

/*
 * info = {
 * 	toid:toid,
 * 	text:text
 * 	}
 *
 */
const sendedMsg = (toid,msgid,result) =>{
	const action = {
		type: 'sendedmsg',
		toid: toid,
		msgid: msgid,
		result: result
	}
	return action;
}

/*
 * info = {
 * 	fromid:fromid,
 * 	toid:toid,
 * 	time:time,
 * 	text:text
 * 	}
 *
 */
const sendingMsg = (info) =>{
	return commonaction('sendingmsg',info);
}
/*
 * info = {
 * 	fromid:fromid,
 * 	toid:toid,
 * 	time:time,
 * 	text:text
 * 	}
 *
 */
const receivedMsg = (info) =>{
	const action = {
		type: 'receivedmsg',
		info: info
	}
	return action;
}

const receivedPubMsg = (info) =>{
	const action = {
		type: 'receivedpubmsg',
		info: info
	}
	return action;
}
const genMd5 = (id,object) =>{
	const str = object.toString();
	const md5Hash = CryptoJS.MD5(str).toString();
	const action = {
		type: 'genmd5',
		md5str: md5Hash,
		id: id
	}
	return action;

}
const inCleanTime = (id,time) =>{
	const action = {
		type: 'incleantime',
		id: id,
		time: time
	}
	return action;
}

const viewCleanTime = (id,time) =>{
	const action = {
		type: 'viewcleantime',
		id: id,
		time: time
	}
	return action;
}
const cleanSending = () => {
	const action = {
		type: 'cleansending'
	}
	return action;
}
const cleanReceived = () => {
	const action = {
		type: 'cleanreceived'
	}
	return action;
}
const onChatingId = (id) => {
	const action = {
		type: 'onchatingid',
		id: id
	}
	return action;
}
const newAlert = (id) => {
	const action = {
		type: 'newalert',
		id: id
	}
	return action;
}



const testAction = () =>{
	const info = {
		hint:'a test to redux action'
	}

	const testaction = commonaction('testaction',info);
	return testaction;
}

export { newAlert, quickUsrInfoId, quickUsrInfoPubkey ,onChatingId, cleanSending, cleanReceived, usrInfo , newUsrInfo, sendedMsg, sendingMsg, receivedMsg,testAction,receivedPubMsg,genMd5,inCleanTime,viewCleanTime }





