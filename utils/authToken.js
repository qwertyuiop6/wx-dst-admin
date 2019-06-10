/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-use-before-define */
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const request = Promise.promisify(require('request'));

const token_path = path.join(__dirname, '../configs/token.json');

const pre = 'https://api.weixin.qq.com/cgi-bin/';
const api = {
  accessToken: `${pre}token?grant_type=client_credential`,
};

const accessToken = async (opts) => {
  this.appID = opts.appID;
  this.appSecret = opts.appSecret;
  // this.getAccessToken = opts.getAccessToken
  // this.saveAccessToken = opts.saveAccessToken

  let data = await getAccessToken(token_path);
  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log('解析本地access_token错误,开始更新token..');
    data = await updateAccessToken();
    await saveAccessToken(data);
    return data.access_token;
  }
  if (isValidAccessToken(data)) {
    // Promise.resolve(data)
    console.log(`access_token在有效内,值为:[ ${data.access_token} ]`);
    return data.access_token;
  }
  console.log('access_token已过期,开始更新token..');
  data = await updateAccessToken();
  await saveAccessToken(data);
  return data.access_token;
};

// 获取本地access_token
let getAccessToken = token_path => new Promise((resolve, reject) => {
  fs.readFile(token_path, 'utf-8', (err, data) => {
    err && reject(err) || resolve(data);
  });
});

// 保存access_token到本地
let saveAccessToken = data => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-param-reassign
  data = JSON.stringify(data);
  fs.writeFile(token_path, data, (err) => {
    err && reject(err) || resolve(data);
  });
});

// 判断access_token是否过期
let isValidAccessToken = (data) => {
  if (!data || !data.access_token || !data.expires_in) {
    return false;
  }

  const {
    expires_in,
  } = data;
  const now = (new Date().getTime());

  return now < expires_in;
};

// 更新access_token
let updateAccessToken = () => {
  const {
    appID,
    appSecret,
  } = this;
  const url = `${api.accessToken}&appid=${appID}&secret=${appSecret}`;

  return new Promise((resolve, reject) => {
    request({
      url,
      json: true,
    }).then((res) => {
      console.log('请求token结果:', res.body);
      const data = {};
      data.access_token = res.body.access_token;
      const now = (new Date().getTime());
      const expires_in = now + (res.body.expires_in - 20) * 1000;
      data.expires_in = expires_in;
      resolve(data);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};

module.exports = accessToken;
