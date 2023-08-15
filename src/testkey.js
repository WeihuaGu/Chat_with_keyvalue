import { genkeypair } from './key.js'
import { encrypt, decrypt, getEncryptedPass , getDecryptedPass} from './encrypt.js';
// 生成密钥对
//const keyPair = genkeypair();
//console.log(keyPair);

// 要加密的原始数据
const originalData = 'Hello, world!';

// 加密数据
const encryptedData = encrypt(originalData);
console.log('Encrypted Pass:', encryptedData.encryptedpass);
console.log('Encrypted Content:', encryptedData.encryptedcontent);
// 解密数据
const decryptedData = decrypt(encryptedData);
console.log('Decrypted Data:', decryptedData);

// 比较解密后的数据与原始数据是否一致
console.log('Data Match:', decryptedData === originalData);
