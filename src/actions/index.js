const usrInfo = (info) =>{
	const action = {
		type: 'usrinfo',
		info
	}
	return action;
}

const newUsrInfo = (info) =>{
	const action = {
		type: 'newusrinfo',
		info
	}
	return action;
}

export { usrInfo , newUsrInfo }


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



