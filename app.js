const Koa = require('koa');

const myrouter = require('./router');
const app = new Koa();

app
  .use(myrouter)
  .listen(80);

console.log('listen on localhost:80');
