import crypto from 'crypto';
import stringRandom from 'string-random';
import { genkeypair, pubKey, privKey} from './key.js'

const aes_encrypt = (text, key, iv) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const gen_pass = () => {
  const pass = stringRandom(32);
  const iv = stringRandom(16);
  return {
    pass: pass,
    iv: iv
  };
};

const getencryptedpass = (pass, iv) => {
  const passencrypted = crypto.publicEncrypt(pubKey, Buffer.from(pass + iv));
  return passencrypted.toString('base64');
};

export const encrypt = (data) => {
  const passandiv = gen_pass();
  const aesencrypted = aes_encrypt(data, passandiv.pass, passandiv.iv);
  return {
    encryptedpass: getencryptedpass(passandiv.pass, passandiv.iv),
    encryptedcontent: aesencrypted
  };
};


//以下是解密函数的示例
const aes_decrypt = (encrypted, key, iv) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const getDecryptedMessage = (encryptedPass, encryptedContent) => {
  const decryptedPass = crypto.privateDecrypt(privKey, Buffer.from(encryptedPass, 'base64'));
  const passAndIv = decryptedPass.toString('utf8');
  const key = passAndIv.substring(0, 32);
  const iv = passAndIv.substring(32);
  const decryptedContent = aes_decrypt(encryptedContent, key, iv);
  return decryptedContent;
};

export const decrypt = (encryptedData) => {
  const { encryptedpass, encryptedcontent } = encryptedData;
  const decryptedMessage = getDecryptedMessage(encryptedpass, encryptedcontent);
  return decryptedMessage;
};
