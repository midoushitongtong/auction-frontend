import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 收藏品相关接口
 *
 */
interface Api {
  // 获取搜索条件
  selectSearchCondition: () => {};
  // 获取搜索结果
  selectList: (searchCondition: any) => {};
}

/**
 * 账户相关接口实现
 *
 */
const api: Api = {
  selectSearchCondition: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/collection/searchCondition`
    );
  },
  selectList: (searchCondition: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/collection/list`,
      searchCondition
    );
  }
};

export default api;
