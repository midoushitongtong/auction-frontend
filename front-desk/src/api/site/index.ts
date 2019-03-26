import ajax from '../../util/ajax';
// import config from '../../config';

/**
 * 站点相关接口
 *
 */
interface Api {
  // 获取站点基本信息
  getSiteInfo: () => {};
}

/**
 * 账户相关接口实现
 *
 */
const api: Api = {
  getSiteInfo: (): object => {
    return ajax(
      'GET',
      `http://106.13.107.45/Idx`,
      {}
    );
  }
};

export default api;
