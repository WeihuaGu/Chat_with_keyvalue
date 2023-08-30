import Redis from 'ioredis';
const redisurlenv = process.env.REDIS_URL;
const redisurl = redisurlenv || 'redis://192.168.9.2:6379';
let client = new Redis(redisurl);
var redisset = async(key,value)=>{
	return await client.set(key,value)
}

var redisget = async(key)=>{
        return await client.get(key)
}

var redislpush = async(key,list)=>{
        return await client.lpush(key,list)
}

var redislrange = async(key,start=0,end=-1)=>{
        return await client.lrange(key,start,end)
}

var redisdel = async(key)=>{
	return await client.del(key)
}

const redismethod = {
	setkeyjson:redisset,
	pushtolist:redislpush,
	getlist:redislrange,
        getkeyvalue:redisget
}
export { redismethod  }
