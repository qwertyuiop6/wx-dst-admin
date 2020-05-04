const Router = require('koa-router');

const wxAuth = require('./controllers/wxAuth');
const handleMsg = require('./controllers/handleMsg');

const router = new Router();

router
  .get('/', (ctx) => {
    ctx.body = '欢迎来到哲学♂世界';
  })
  // .post('/', (ctx) => {
  //   ctx.status = 405;
  //   ctx.body = 'you can\'t do this';
  // })
  
  .all('/wx', wxAuth)
  .post('/wx', handleMsg)

  .all('/*',(ctx)=>{
    console.log(`非法${ctx.method}请求:${ctx.href}`);
    ctx.status=403;
    ctx.body='禁止访问'
  })

module.exports = router.routes();
