/* eslint-disable no-nested-ternary */
const reply = (msg, type, ctx, replyMsg) => {
  const now = new Date().getTime();
  ctx.status = 200;
  ctx.type = 'application/xml';
  const constMsg = `<xml>
    <ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
    <CreateTime>${now}</CreateTime>
    <MsgType><![CDATA[${type}]]></MsgType>`;

  let typeMsg = `${type === 'text' ? `<Content><![CDATA[${replyMsg}]]></Content>`
    : type === 'image' ? `<Image><MediaId><![CDATA[${replyMsg}]]></MediaId></Image>`
      : ''}`;

  if (type === 'news') {
    typeMsg = `<ArticleCount>${replyMsg.title.length}</ArticleCount><Articles>`;
    for (let i = 0; i < replyMsg.title.length; i += 1) {
      const item = `
          <item>
            <Title><![CDATA[${replyMsg.title[i]}]]></Title>
            <Description><![CDATA[${replyMsg.desc[i]}]]></Description>
            <PicUrl><![CDATA[${replyMsg.picurl[i]}]]></PicUrl>
            <Url><![CDATA[${replyMsg.url[i]}]]></Url>
          </item>`;
      typeMsg += item;
    }
    typeMsg += '</Articles>';
  }

  ctx.body = `${constMsg + typeMsg}</xml>`;
  // return ctx
};

module.exports = {
  reply,
};
