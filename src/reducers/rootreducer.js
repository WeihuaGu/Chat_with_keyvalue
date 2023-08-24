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
const sending = (state = {},action)=>{
	if(action.type === 'sendingmsg'){
		const newstate = cloneDeep(state);
		const thesenddic = {
			id:action.info.id,
			fromid:action.info.fromid,
 			time:action.info.time,
			toid:action.info.toid,
			text:action.info.text,
			msgstatus:action.info.msgstatus
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
	if(action.type === 'sendedmsg'){
		const newstate = cloneDeep(state);
		if(action.toid in newstate){
			const list = newstate[action.toid];
			list.forEach((item) => {
				if(item['id']===action.msgid)
					item['msgstatus'] = action.result
  			});
		}
		return newstate;

	}
	if(action.type === 'cleansending'){
		return {};
	}
	return state;
}
const received = (state = {},action)=>{
	if(action.type === 'receivedmsg'){
		const newstate = cloneDeep(state);
		const thesenddic = {
			id:action.info.id,
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
	if(action.type === 'receivedpubmsg'){
		const newstate = cloneDeep(state);
		const thesenddic = {
			id:action.info.id,
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
	if(action.type === 'cleanreceived'){
		return {};
	}
	return state;
}
const comparemd5 = (state = {publicmd5:"",memd5:""},action)=>{
	if(action.type==='genmd5'){
		const newstate = cloneDeep(state);
		if(action.id === 'pub')
			newstate['publicmd5'] = action.md5str;
		if(action.id === 'me')
			newstate['memd5'] = action.md5str;
		return newstate;
	}
	return state;

}
const incleantime = (state = {},action)=>{
	if(action.type==='incleantime'){
		const newstate = cloneDeep(state);
		newstate[action.id] = action.time;
		return newstate;
	}
	return state;
}
const viewcleantime = (state = {},action)=>{
	if(action.type==='viewcleantime'){
		const newstate = cloneDeep(state);
		newstate[action.id] = action.time;
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
	sending:sending,
	received:received,
	comparemd5:comparemd5,
	incleantime:incleantime,
	viewcleantime:viewcleantime,
	test:test
});

export default rootReducer;
