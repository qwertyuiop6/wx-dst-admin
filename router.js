const Router = require('koa-router');

const wxAuth = require('./controllers/wxAuth');
const handleMsg = require('./controllers/handleMsg');

const router = new Router();

// 微信认证和客户端post消息处理
router
  .get('/', (ctx) => {
    ctx.body = '欢迎来到哲学♂世界';
  })
  .post('/', (ctx) => {
    ctx.status = 405;
    ctx.body = 'you can\'t do this';
  })
  .get('/wx', wxAuth)
  .post('/wx', handleMsg);

module.exports = router.routes();
