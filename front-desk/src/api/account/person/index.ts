import ajax from '../../../util/ajax';
import config from '../../../config';

/**
 * 个人账户相关接口
 *
 */
interface Api {
  // 获取我的收藏品收藏列表
  selectAccountPersonCollectionFavoriteList: (searchCondition: any) => object;
}

/**
 * 个人账户相关接口实现
 *
 */
const api: Api = {
  selectAccountPersonCollectionFavoriteList: (searchCondition: any): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/account/person/collection/favorite/list`,
      searchCondition
    );
  }
};

export default api;
