import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 站点相关接口
 *
 */
interface Api {
  // 获取站点基本信息
  getSiteInfo: () => object;
}

/**
 * 站点相关接口实现
 *
 */
const api: Api = {
  getSiteInfo: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/Idx`,
      {}
    );
  }
};

export default api;
