import axios from 'axios';
const pichub_github_url = process.env.REACT_APP_PICHUB_GITHUB_URL;
const token = process.env.REACT_APP_TOKEN;
// 设置自定义 Header
const headers = {
  token: token
};
const pichub_githuburl = () =>{
        const url = pichub_github_url+'/pichub/github';
        return url
}

const pichub_github = (base64img)=>{
   const msg = {
	base64Img:base64img
   }
   return new Promise((resolve,reject)=>{
       if(pichub_github_url){
   		const pushed = axios.post(pichub_githuburl(),msg,{headers})
                pushed.then((result)=>resolve(result)).catch((err)=>reject(err));
       }else
	   reject('pichub_github_url not set');
   });
}
const pichub = {
        github:pichub_github
}

export { pichub  }
