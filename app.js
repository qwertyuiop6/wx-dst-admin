const Koa = require('koa');

const myrouter = require('./router');
const wxAuth = require('./controllers/wxAuth');

const app = new Koa();

app
  .use(myrouter)
  .use(wxAuth)
  .listen(2222);

console.log('listen on localhost:2222');
