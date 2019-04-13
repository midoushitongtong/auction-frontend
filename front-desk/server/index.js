const Koa = require('koa');
const KoaConnect = require('koa-connect');
const KoaRouter = require('koa-router');
const Compression = require('compression');
const Next = require('next');
const AppRouter = require('./app-router');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT;

// 打印当前环境
console.log(`environment: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT}`);

// 删除系统代理
delete process.env['http_proxy'];
delete process.env['HTTP_PROXY'];
delete process.env['https_proxy'];
delete process.env['HTTPS_PROXY'];

const app = Next({
  dev,
  dir: './src'
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();

  // gzip
  server.use(KoaConnect(Compression()));

  // status code
  server.use(async (ctx, next) => {
    ctx.compress = true;
    ctx.res.statusCode = 200;
    await next();
  });

  // router
  const router = new KoaRouter();
  AppRouter(router, app);
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost: ${port}`);
  });
});
