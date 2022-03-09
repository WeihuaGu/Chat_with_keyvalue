const Pusher = require("pusher");
const Subscriber = require("pusher-js");

const pusher = new Pusher({
  appId: "1357318",
  key: "64d98dc2d22561f36cd0",
  secret: "fdd249f87e5f402ce9a9",
  cluster: "ap3"
});
var subscriber = new Subscriber('64d98dc2d22561f36cd0', {
      cluster: 'ap3'
});
module.exports.subscribeChannel = (channel)=>{
	var channelobject = subscriber.subscribe('channel');
	return channelobject;
}
module.exports.publisheChannel = (channel,channelevent,msg)=>{
	pusher.trigger(channel, channelevent, msg);
}


