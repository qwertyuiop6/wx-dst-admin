/* eslint-disable quote-props */
const getrb = require('raw-body');

const formartXml = require('../utils/formartXml');
const msgUtil = require('../utils/msgUtil');
const getUserInfo = require('../utils/getUserInfo');
const admin = require('../utils/admin');


const cfg = require('../configs/config');

// 微信post请求消息处理
const handleMsg = async (ctx) => {
  // 获取消息内容xml
  const data = await getrb(ctx.req, {
    length: ctx.length,
    limit: '1mb',
    encoding: ctx.charset,
  });
  // xml解析为js对象
  const content = await formartXml.parseXMLAsync(data);
  const msg = formartXml.formatMessage(content.xml);
  console.log('请求消息xml转化后的信息', msg);

  // 首次关注发送的news类型消息
  const newsInfo = {
    title: [`欢迎来到哲学♂世界管理台`, '别吃那个土豆啊那是服务器', '心情真的很黑♂暗'],
    desc: ['别点我', '点了也没用', '不信是吧'],
    picurl: ['http://pnjhl03pt.bkt.clouddn.com/tudou.jpg', 'http://pnjhl03pt.bkt.clouddn.com/heian.jpg', 'http://pnjhl03pt.bkt.clouddn.com/huaji.jpg'],
    url: ['', '', ''],
  };

  // 事件类型处理
  if (msg.MsgType === 'event') {
    if (msg.Event === 'subscribe') {
      msgUtil.reply(msg, 'news', ctx, newsInfo);
    }
    if (msg.Event === 'CLICK') {
      const msgUserName = await getUserInfo(cfg, msg.FromUserName);
      console.log(`用户：${msgUserName} 触发事件: ${msg.EventKey}`);
      // msgUtil.reply(msg, 'text', ctx, `Hello ♂ ${msgUserName}狗管理`);
      const result = await admin(msgUserName, msg.EventKey);
      msgUtil.reply(msg, 'text', ctx, result);
    }
    // 其他类型处理
  } else if (msg.MsgType === 'text') {
    msgUtil.reply(msg, 'text', ctx, `${msg.Content} ♂`);
  } else if (msg.MsgType === 'image') {
    msgUtil.reply(msg, 'image', ctx, msg.MediaId);
  } else {
    msgUtil.reply(msg, 'text', ctx, `暂不支持的消息类型：${msg.MsgType}`);
  }
  return true;
};

module.exports = handleMsg;
