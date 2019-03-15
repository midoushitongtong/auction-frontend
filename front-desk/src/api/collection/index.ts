import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 收藏品相关接口
 *
 */
interface Api {
  // 获取搜索条件
  getSearchCondition: () => {};
  // 获取搜索结果
  getList: (searchCondition: any) => {};
}

/**
 * 账户相关接口实现
 *
 */
const api: Api = {
  getSearchCondition: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/collection/searchCondition`
    );
  },
  getList: (searchCondition: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/collection/searchResult`,
      searchCondition
    );
  }
};

export default api;