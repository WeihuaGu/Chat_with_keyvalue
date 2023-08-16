import { publisheChannel } from './subscriber-publisher.js';
import { decrypt } from './encrypt.js';
const info = {
	 toid:3344,
	 text:'hi world'
}
const haha = publisheChannel(1111,info,'pub');
console.log('解密');
const pinfo = JSON.parse(haha);
if(pinfo.type == 'secret'){
	const dmsg = decrypt(pinfo.msg);
	console.log(dmsg);
	console.log(typeof dmsg === 'string');
}
else{
	console.log(pinfo.msg);
	console.log(typeof pinfo.msg === 'string');
}
	



