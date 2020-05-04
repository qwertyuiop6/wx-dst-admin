const Koa = require('koa');

const myrouter = require('./router');
const app = new Koa();

app
  .use(myrouter)
  .listen(2222);

console.log('listen on localhost:2222');
