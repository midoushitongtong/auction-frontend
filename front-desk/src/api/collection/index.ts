import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 收藏品相关接口
 *
 */
interface Api {
  // 获取热门收藏品列表
  selectCollectionFavoriteList: () => object;
  // 获取收藏品搜索条件
  selectCollectionSearchCondition: () => object;
  // 获取收藏品列表
  selectCollectionList: (searchCondition: any) =>object;
  // 获取收藏品详情
  selectCollectionDetail: (id: any) => object;
}

/**
 * 收藏品相关接口实现
 *
 */
const api: Api = {
  selectCollectionFavoriteList: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/HP`
    );
  },
  selectCollectionSearchCondition: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/CateList`
    );
  },
  selectCollectionList: (searchCondition: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/PT`,
      searchCondition
    );
  },
  selectCollectionDetail: (id: any) : object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/PtRead/${id}`
    );
  }
};

export default api;
