import { publisheChannel,subscribeChannel, publisheInfo2Channel,subscribeChannelInfo } from './subscriber-publisher.js';
const info = {
	 id: 'jJljajfajfjaskfjlakjflj',
	 toid:3344,
	 text:'hi world'
}
const cinfo = {
	id:1111,
	pubkey:'alfjajfjakakdjfakfjafj',
	lasttime: '2023-12-22'
}
const pub = publisheChannel(1111,info,'pub');
const getlist = subscribeChannel(1111);
const pubinfo = publisheInfo2Channel(1111,cinfo);
const getinfo = subscribeChannelInfo(1111);

pub.then((haha)=>{
	console.log(haha)
});
getlist.then((haha)=>{
	console.log(haha)
});
pubinfo.then((haha)=>{
	console.log(haha)
});
getinfo.then((haha)=>{
	console.log(haha)
});
	



