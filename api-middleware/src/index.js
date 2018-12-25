const Koa = require('koa');
const cors = require('koa2-cors');
// 路由
const router = require('./router');

// koa 实例
const app = new Koa();

// 设置跨域
app.use(cors({
  // 允许客户端携带 cookie
  credentials: true
}));

// 注册路由
app
  .use(router.routes())
  .use(router.allowedMethods());

// 启动服务器
app.listen(3004);
console.log('Server running on port 3004');
