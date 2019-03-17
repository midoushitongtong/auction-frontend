const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const AppRouter = require('./app-router');

const port = process.env.PORT;
const dev = process.env.NODE_ENV !== 'production';

// 打印当前环境
console.log(`environment: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT}`);

// 删除系统代理
delete process.env['http_proxy'];
delete process.env['HTTP_PROXY'];
delete process.env['https_proxy'];
delete process.env['HTTPS_PROXY'];

const app = next({
  dev,
  dir: './src'
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  // 路由
  AppRouter(router, app);

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  // 加载应用路由
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
