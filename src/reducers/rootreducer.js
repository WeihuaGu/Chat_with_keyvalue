// reducers.js
import { cloneDeep } from 'lodash';
import { combineReducers } from 'redux';
// 其他 reducer
const usrinfo = (state = {},action)=> {
	if(action.type == 'usrinfo'){
		const newstate = cloneDeep(state);
		newstate.id = action.info.id;
		newstate.pubkey = action.info.pubkey;
		newstate.long = 'old';
		return  newstate;
	}
	if(action.type == 'newusrinfo'){
		const newstate = cloneDeep(state);
		newstate.id = action.info.id;
		newstate.pubkey = action.info.pubkey;
		newstate.long = 'new';
		return  newstate;
	}
	return state;
}
const sended = (state = {},action)=>{
	if(action.type == 'sendedmsg'){
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
	

const rootReducer = combineReducers({
	usrinfo:usrinfo,
	sended:sended
});

export default rootReducer;
