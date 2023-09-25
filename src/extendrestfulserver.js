import axios from 'axios';
import lzString from 'lz-string';
import { v4 as uuidv4 } from 'uuid';
import { TPIC_MARK } from './util';
const pichub_github_url = process.env.REACT_APP_PICHUB_GITHUB_URL;
const textcontent_github_url = process.env.REACT_APP_PICHUB_GITHUB_URL;
const token = process.env.REACT_APP_TOKEN;
// 设置自定义 Header
const headers = {
  token: token
};
const axiosconfig = {
  maxContentLength: 5242880, // 设置请求有效负载的最大长度，单位为字节
};
const pichub_githuburl = () =>{
        const url = pichub_github_url+'/pichub/github';
        return url
}

const pichub_github = (base64img)=>{
   const comprestr = lzString.compress(base64img);
   const msg = {
	base64Img:comprestr
   }
   return new Promise((resolve,reject)=>{
       if(pichub_github_url){
   		const pushed = axios.post(pichub_githuburl(),msg,{headers,...axiosconfig})
                pushed.then((result)=>resolve(result)).catch((err)=>reject(err));
       }else
	   reject('pichub_github_url not set');
   });
}
const textcontent_githuburl = () =>{
        const url = textcontent_github_url+'/github/upcontent/textcontent/compress';
        return url
}

const textcontent_github = (base64img)=>{
   const comprestr = lzString.compress(base64img);
   const cpicId = uuidv4();
   const cpicTime = new Date().toISOString();
   const msg = {
	content: comprestr,
	message: "a new cpic"+cpicId,
	path: "/cpic/"+cpicId+cpicTime+TPIC_MARK

   }
   return new Promise((resolve,reject)=>{
       if(textcontent_github_url){
   		const pushed = axios.post(textcontent_githuburl(),msg,{headers,...axiosconfig})
                pushed.then((result)=>resolve(result)).catch((err)=>reject(err));
       }else
	   reject('textcontent_github_url not set');
   });
}
const pichub = {
        github:pichub_github
}
const textcontent = {
        github:textcontent_github
}

export { pichub , textcontent}
