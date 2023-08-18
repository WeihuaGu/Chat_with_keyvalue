// reducers.js
import { cloneDeep } from 'lodash';
import { combineReducers } from 'redux';
// 其他 reducer
const usrinfo = (state = {},action)=> {
	if(action.type === 'usrinfo'){
		const newstate = cloneDeep(state);
		newstate.id = action.info.id;
		newstate.pubkey = action.info.pubkey;
		newstate.long = 'old';
		return  newstate;
	}
	if(action.type === 'newusrinfo'){
		const newstate = cloneDeep(state);
		newstate.id = action.info.id;
		newstate.pubkey = action.info.pubkey;
		newstate.long = 'new';
		return  newstate;
	}
	return state;
}
const sended = (state = {},action)=>{
	if(action.type === 'sendedmsg'){
		const newstate = cloneDeep(state);
		const thesenddic = {
			toid:action.info.toid,
			text:action.info.text
		}
		if(action.info.toid in newstate){
			const list = newstate[action.info.toid];
			list.push(thesenddic);
		}
		else{
			newstate[action.info.toid] = [];
			newstate[action.info.toid].push(thesenddic);
		}
		return newstate;

	}
	return state;
}
const sending = (state = {},action)=>{
	if(action.type === 'sendingmsg'){
		const newstate = cloneDeep(state);
		const thesenddic = {
			fromid:action.info.fromid,
 			time:action.info.time,
			toid:action.info.toid,
			text:action.info.text
		}
		if(action.info.toid in newstate){
			const list = newstate[action.info.toid];
			list.push(thesenddic);
		}
		else{
			newstate[action.info.toid] = [];
			newstate[action.info.toid].push(thesenddic);
		}
		return newstate;

	}
	return state;
}
const received = (state = {},action)=>{
	if(action.type === 'receivedmsg'){
		const newstate = cloneDeep(state);
		const thesenddic = {
			fromid:action.info.fromid,
 			time:action.info.time,
			toid:action.info.toid,
			text:action.info.text
		}
		if(action.info.fromid in newstate){
			const list = newstate[action.info.fromid];
			list.push(thesenddic);
		}
		else{
			newstate[action.info.fromid] = [];
			newstate[action.info.fromid].push(thesenddic);
		}
		return newstate;

	}
	return state;
}
const test = (state = '',action)=>{
	if(action.type==='testaction'){
		const newstate = action.info;
		return newstate;
	}else{
		return state;
	}
}

	

const rootReducer = combineReducers({
	usrinfo:usrinfo,
	sended:sended,
	sending:sending,
	received:received,
	test:test
});

export default rootReducer;
