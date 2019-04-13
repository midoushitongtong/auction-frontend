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

  // 开启 gzip 压缩
  server.use(KoaConnect(Compression()));

  // 同一状态码 200
  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  // 路由配置
  const router = new KoaRouter();
  // 页面对应的路由
  AppRouter(router, app);
  if (!dev) {
    // 生产环境告诉浏览器缓存 css 资源
    router.get(/^\/_next\/static\/css\//, async ctx => {
      ctx.set(
        'Cache-Control',
        'public, max-age=31536000, immutable'
      );
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });
  }
  // 让 next 来处理其余请求
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost: ${port}`);
  });
});
