import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 收藏品相关接口
 *
 */
interface Api {
  // 获取热门收藏品列表
  selectCollectionFavoriteList: () => {};
  // 获取收藏品搜索条件
  selectCollectionSearchCondition: () => {};
  // 获取收藏品列表
  selectCollectionList: (searchCondition: any) => {};
  // 获取收藏品详情
  selectCollectionDetail: (id: any) => {};
}

/**
 * 账户相关接口实现
 *
 */
const api: Api = {
  selectCollectionFavoriteList: (): object => {
    return ajax(
      'GET',
      `http://106.13.107.45/HP`
    );
  },
  selectCollectionSearchCondition: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/collection/searchCondition`
    );
  },
  selectCollectionList: (searchCondition: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/collection/list`,
      searchCondition
    );
  },
  selectCollectionDetail: (id: any) : object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/collection/detail/${id}`
    );
  }
};

export default api;
