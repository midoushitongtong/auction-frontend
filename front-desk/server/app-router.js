// 导出所有页面的对应的路由
module.exports = (router, app) => {
  // 首页
  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/home', ctx.query);
    ctx.respond = false;
  });

  // 账户 - 登陆
  router.get('/account/sign-in', async ctx => {
    await app.render(ctx.req, ctx.res, '/account/sign-in', ctx.query);
    ctx.respond = false;
  });

  // 账户 - 注册
  router.get('/account/sign-up', async ctx => {
    await app.render(ctx.req, ctx.res, '/account/sign-up', ctx.query);
    ctx.respond = false;
  });

  // 账户 - 个人中心 - 个人信息
  router.get('/account/person/info', async ctx => {
    await app.render(ctx.req, ctx.res, '/account/person/info', ctx.query);
    ctx.respond = false;
  });

  // 账户 - 个人中心 - 我的收藏
  router.get('/account/person/collection-favorite', async ctx => {
    await app.render(ctx.req, ctx.res, '/account/person/collection-favorite', ctx.query);
    ctx.respond = false;
  });

  // 收藏品 - 查询页
  router.get('/collection', async ctx => {
    await app.render(ctx.req, ctx.res, '/collection', ctx.query);
    ctx.respond = false;
  });

  // 收藏品 - 详情页面
  router.get('/collection/detail/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/collection/detail', {
      id: ctx.params.id
    });
    ctx.respond = false;
  });

  // 咨询中心 - 公告页面
  router.get('/notice', async ctx => {
    await app.render(ctx.req, ctx.res, '/notice', ctx.query);
    ctx.respond = false;
  });

  // 咨询中心 - 公告详情页面
  router.get('/notice/detail/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/notice/detail', {
      id: ctx.params.id
    });
    ctx.respond = false;
  });
};
