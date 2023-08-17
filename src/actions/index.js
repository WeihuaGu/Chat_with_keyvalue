const commonaction = (type,info) =>{
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

export { usrInfo , newUsrInfo, sendedMsg, sendingMsg, receivedMsg }





