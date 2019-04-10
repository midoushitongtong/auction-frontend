const Router = require('koa-router');

// 实例化路由
const router = new Router();

// oss 控制器
const ossController = require('../controller/oss');

// oss 路由
router.get('/oss/stsToken', ossController.selectStsToken);

// 导出路由表
module.exports = router;
