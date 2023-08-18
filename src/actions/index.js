import { v4 as uuidv4 } from 'uuid';

// 将消息保存在你的应用中
const commonaction = (type,info) =>{
	const messageId = uuidv4();
	const currentTime = new Date();
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

/*
 * info = {
 * 	toid:toid,
 * 	text:text
 * 	}
 *
 */
const sendedMsg = (info) =>{
	return commonaction('sendedmsg',info);
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
	return commonaction('receivedmsg',info);
}


const testAction = () =>{
	const info = {
		hint:'a test to redux action'
	}

	const testaction = commonaction('testaction',info);
	return testaction;
}

export { usrInfo , newUsrInfo, sendedMsg, sendingMsg, receivedMsg,testAction }





