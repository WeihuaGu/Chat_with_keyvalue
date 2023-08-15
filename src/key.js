import NodeRSA from 'node-rsa';
const genkeypair = ()=>{
  // 生成RSA密钥对
  const key = new NodeRSA({ b: 2048 });
  const publicKey = key.exportKey('pkcs8-public-pem');
  const privateKey = key.exportKey('pkcs8-private-pem');
  return {
          publickey:publicKey,
          privatekey:privateKey
  }
}


const pubKey = () => {
  const testkey = '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6SEqCG9NSrgHGAyyTZfZ\n' +
    'ObXc/+6eJEjUKaglMvUiSbMdYT5qeCPzD0j7U57DcE0tn8BeLCL1HjOCGfPoKiWG\n' +
    'fwUOBstJvW7sqlQefBnPTy+07h6WKF/2H8J/6hInCRmopFn9x9cLaj4ce/dh+0cI\n' +
    'L4K4HZ+58jSqzRICabBUwvzeL+WrDtMpnS/JgzPxyyV7tl+sg/n0+dGfS1l2hqPY\n' +
    'Zr0/g/53aiGzCAeu5t0moCvEPfBEd0XEisOC6Dcl3jgKTn17dd+dk4Jmsc7428i9\n' +
    'ycriBUZj39HgotmpG5qZG0fHt0B6aXMJwYVE504uNobmKrYinhixXd4D2zX03rEZ\n' +
    '5wIDAQAB\n' +
    '-----END PUBLIC KEY-----\n';
    if(typeof localStorage == "undefined")
	return testkey;
    var storedPublicKey = localStorage.getItem('publicKey');
    if(storedPublicKey)
	return storedPublicKey;
    else
	return testkey;
	

}
const privKey = () => {
  const testkey = '-----BEGIN PRIVATE KEY-----\n' +
    'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDpISoIb01KuAcY\n' +
    'DLJNl9k5tdz/7p4kSNQpqCUy9SJJsx1hPmp4I/MPSPtTnsNwTS2fwF4sIvUeM4IZ\n' +
    '8+gqJYZ/BQ4Gy0m9buyqVB58Gc9PL7TuHpYoX/Yfwn/qEicJGaikWf3H1wtqPhx7\n' +
    '92H7Rwgvgrgdn7nyNKrNEgJpsFTC/N4v5asO0ymdL8mDM/HLJXu2X6yD+fT50Z9L\n' +
    'WXaGo9hmvT+D/ndqIbMIB67m3SagK8Q98ER3RcSKw4LoNyXeOApOfXt1352Tgmax\n' +
    'zvjbyL3JyuIFRmPf0eCi2akbmpkbR8e3QHppcwnBhUTnTi42huYqtiKeGLFd3gPb\n' +
    'NfTesRnnAgMBAAECggEAUYDGsSw4WWb9E+tcasQrrYFnQhKqNwU/J1EhsC8DTcDR\n' +
    'BK5NirMGxtE9DH701M4mpTMbuVJ/X4+ibHBZOmLkIoQh4z4vCYs+Mk42WiyrzYNg\n' +
    'Pd9zn6ns4i2dirfN7eCKlOrhTnxgAUS1sKFMIA01T2bj93dgCs1e6VLihRCgkYor\n' +
    'SZnWuH3Fh2FfKsZmGgDvMWBuUs3Uhz+O0VAbO/eqwLvu4dZSXUMYNYDBi+F+pIk7\n' +
    'OEGAnOjd+gwPpadhTS3MhHKF/e6+vPd0CYVaqDlSka9/DD1eqFb+q6kZ6jPHougL\n' +
    '7SfeGvdtNCFoHHjIIqaN88T7WQ6GcSIlQOo8Y+T8AQKBgQDvdLAojl/fvw7QTfjN\n' +
    'ijnxjN57BTavUQ1gOOH0EdBNkTLkmSatxG5OwrbY6NpwBqoe9NljoJX5YxXWTUBh\n' +
    'MJpqdGomsb1Fra5+JvmpMpN/4ZZL8UmisQ9HBfWSTYMUXqwPFpsTwFuJc0SBxa/V\n' +
    'w4CAMfNGHUCQgbwlBc3LpURV5QKBgQD5PJT4SSjxI8W6JRRWqZnq2fSuxwd7DhWE\n' +
    '9juo75wMWWYRpWvxHZhWDUKiXXC39mEcsBkaa6z9iSzZ0LIK4lz60jhmGhHvAdNc\n' +
    'YACG7aH+JD/XMsak34BgYGEqnJkbXa84ZAAXQSoAiLoCzCfymdU6xcdXKX5kFOKx\n' +
    'ZEAlfbMz2wKBgCxsG1oKv6KEkTz3mhaXdBRpq8RqvTBc+vxE0TY0L86UBzr9Zn2K\n' +
    'GWSnHsCywgNSWTEQ/1tKKUhwp1ZwUmc1WxAwtJilFJXemKZymJJY/aAVu4ovIxf5\n' +
    'fPoSEvKnSo/22DicWvyZDOI87hKdF/eyIx6lJZp2RsoIJ10+7GTBLiI5AoGBAL/+\n' +
    'eC9vhDeGPAnyCGHeErCEp+V/cnbL2a3sVPcFZatprqQHT0iVaMVZP6x92JgOFq8X\n' +
    'xK7CpadFZaSBDLYvvDqHeGTGzmvUdzJgzeci5bg1ymwHNFjLx0P22sMNkTAwkgsZ\n' +
    'laxUSXvR16DSDi/nawf0VWQCldeY8yx9sqBu3X4jAoGAMncKcctLjv4H6kQa+s40\n' +
    'QOAHroAs7ehL0lNGEtAAvNmgbTuIZSRZ6/gfWHtQ8XbUNBYZbkJrlpS6TEvi7SsB\n' +
    'vPXfeSnHMI56FXxN9QzeLDEDOSdD0jlW/b+L71gEvXzydD0pkmz8lZ0B6dPpt/zI\n' +
    '8NDzM2jMbFTTg5ps6EcVk9c=\n' +
    '-----END PRIVATE KEY-----\n';
    if(typeof localStorage == "undefined")
	return testkey;
    var storedPrivateKey = localStorage.getItem('privateKey');
    if(storedPrivateKey)
	return storedPrivateKey;
    else
	return testkey;

}

export { genkeypair, pubKey, privKey}
