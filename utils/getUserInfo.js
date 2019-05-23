const axios = require('axios');
const authToken = require('../utils/authToken');

const userInfoApi = 'https://api.weixin.qq.com/cgi-bin/user/info?';

module.exports = async (cfg, openId) => {
  const token = await authToken(cfg);
  const url = `${userInfoApi}access_token=${token}&openid=${openId}&lang=zh_CN`;
  const res = await axios.get(url);
  // console.log(`获取到${res.data.nickname}的个人信息:\n`, res.data);
  return res.data.nickname;
};