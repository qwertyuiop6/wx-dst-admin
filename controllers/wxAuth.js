/* eslint-disable no-console */
const sha1 = require('sha1');
const token=require('../configs/config').token

// 请求认证处理
module.exports = async (ctx , next) => {
  console.log('验证请求信息.....');
  const method=ctx.method;
  
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
    if (method==='GET') {
      return true;
    }
    await next()
  }
  else{
    console.log(`非微信${method}请求:${ctx.href}`);
    ctx.body = '咦 你好像不在微信?';
    ctx.status = 403;
    return false;
  }
};
