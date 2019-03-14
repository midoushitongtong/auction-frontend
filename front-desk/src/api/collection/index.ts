import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 收藏品相关接口
 *
 */
interface Api {
  // 获取搜索条件
  getSearchCondition: () => {}
}

/**
 * 账户相关接口实现
 *
 */
const api: Api = {
  getSearchCondition(): object {
    return ajax(
      'POST',
      `${config.API_ROOT}/collection/searchCondition`
    );
  }
};

export default api;
