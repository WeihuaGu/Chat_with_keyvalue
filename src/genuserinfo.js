import { genkeypair } from './key.js';
const genid = ()=>{
	const min=1000;
	const max=9999;
	return Math.floor(Math.random()*(max-min+1))+min;
}
const genuserinfo = ()=>{
	return {
		id:genid(),
		keypair:genkeypair()
	}
}




export { genid ,genuserinfo}
