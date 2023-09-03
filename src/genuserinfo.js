import { genkeypair } from './key.js';
const genid = ()=>{
	const min=10000;
	const max=99999;
	return Math.floor(Math.random()*(max-min+1))+min;
}
const genuserinfo = ()=>{
	return {
		id: new Promise((resolve,reject)=>{
				const id = genid();
                        	resolve(id);
                         }),
		keypair: new Promise((resolve,reject)=>{
				const keypair = genkeypair();
                        	resolve(keypair);
                         })
	}
	
}

export { genid ,genuserinfo}
