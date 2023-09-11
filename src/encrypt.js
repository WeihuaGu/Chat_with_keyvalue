import stringRandom from 'string-random';
import CryptoJS from 'crypto-js';
import NodeRSA  from 'node-rsa';
import { pubKey, privKey } from './key.js';
const  passbytes = 16;
const genPass = () => {
  const pass = stringRandom(passbytes);
  const iv = stringRandom(16);
  return {
    pass: pass,
    iv: iv
  };
};
const aesEncrypt = (text, key, iv) => {
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
  return encrypted.toString();
};
const getEncryptedPass = (pass, iv,youpubkey) => {
  const passAndIv = pass + iv;
  const rsa = new NodeRSA();
  rsa.importKey(youpubkey, 'pkcs8-public-pem');
  const encryptedPass = rsa.encrypt(passAndIv,'base64');
  return encryptedPass;
};
const getDecryptedPass = (encryptedPass) => {
  const rsa = new NodeRSA();
  rsa.importKey(privKey(), 'pkcs8-private-pem');
  const decryptedPass = rsa.decrypt(encryptedPass).toString();
  return decryptedPass;
}


const encrypt = (data,youpubkey=pubKey()) => {
  const passAndIv = genPass();
  const encryptedPass = getEncryptedPass(passAndIv.pass, passAndIv.iv,youpubkey);
  const encryptedContent = aesEncrypt(data, passAndIv.pass, passAndIv.iv);
  return {
    encryptedpass: encryptedPass,
    encryptedcontent: encryptedContent
  };
};

// 以下是解密函数的示例
const aesDecrypt = (encrypted, key, iv) => {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const getDecryptedMessage = (encryptedPass, encryptedContent) => {
  const decryptedPass = getDecryptedPass(encryptedPass);
  const passAndIv = decryptedPass.split('');
  const key = passAndIv.slice(0, passbytes).join('');
  const iv = passAndIv.slice(passbytes).join('');
  const decryptedContent = aesDecrypt(encryptedContent, key, iv);
  return decryptedContent;
};

const decrypt = (encryptedData) => {
  const { encryptedpass, encryptedcontent } = encryptedData;
  const decryptedMessage = getDecryptedMessage(encryptedpass, encryptedcontent);
  return decryptedMessage;
};
export { encrypt, decrypt, getEncryptedPass , getDecryptedPass }
