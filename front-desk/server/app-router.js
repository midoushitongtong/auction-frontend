// 导出所有页面的对应的路由
module.exports = (router, app) => {
  // 首页
  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/home', ctx.query);
    ctx.respond = false;
  });

  // 收藏品查询页
  router.get('/collection', async ctx => {
    await app.render(ctx.req, ctx.res, '/collection', ctx.query);
    ctx.respond = false;
  });
};
