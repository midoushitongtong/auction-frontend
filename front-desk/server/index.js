const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const AppRouter = require('./app-router');

const port = process.env.NODE_ENV !== 'production' ? 3000 : 3005;
const dev = process.env.NODE_ENV !== 'production';
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

  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
