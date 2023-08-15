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


export { usrInfo , newUsrInfo, sendedMsg }


/*
module.exports.pushMessage = (text) => {
  const action = { 
  type: 'PUSH_MESSAGE',
  time: new Date().toLocaleTimeString(),
  text
  }
  return action
}
module.exports.subscribeChannel  = (channel) => {
  const action = { 
  type: 'Subscribe_Channel ',
  time: new Date().toLocaleTimeString(),
  channel
  }
  return action
}
*/



