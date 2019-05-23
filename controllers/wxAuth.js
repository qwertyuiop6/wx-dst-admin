/* eslint-disable no-console */
const sha1 = require('sha1');

const cfg = {
  appID: 'wx3c5c6818d35bd342',
  appSecret: 'a18a943916b0a04556ab23771ddcb52a',
  token: 'w771783057',
};

// 请求认证处理
module.exports = (ctx) => {
  console.log('验证请求信息.....');
  const {
    token,
  } = cfg;

  // console.log('query值:', ctx.query);
  // const signature = ctx.query.signature;
  // const nonce = ctx.query.nonce;
  // const timestamp = ctx.query.timestamp;
  // const echostr = ctx.query.echostr;

  // 解构赋值对象
  const {
    signature,
    nonce,
    timestamp,
    echostr,
  } = ctx.query;

  const str = [token, timestamp, nonce].sort().join('');
  if (sha1(str) === signature) {
    console.log('微信验证成功');
    ctx.body = echostr;
    return true;
  }
  console.log(`非微信${ctx.method}请求:${ctx.href}`);
  ctx.body = '咦 你好像不在微信?';
  ctx.status = 403;
  return false;
};
