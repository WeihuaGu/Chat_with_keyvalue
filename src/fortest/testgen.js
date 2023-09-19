import { genuserinfo } from './genuserinfo.js';
const { id ,keypair } = genuserinfo();
id.then((theid)=>{
	console.log(theid);
});
keypair.then((thekeypair)=>{
	console.log(thekeypair);
});

