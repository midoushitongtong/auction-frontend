import ajax from '../../../util/ajax';
import config from '../../../config';

/**
 * 个人账户相关接口
 *
 */
interface Api {
  // 添加/删除已收藏的收藏品
  updateCollectionFavorite: (data: any) => object;
  // 获取我的已收藏的收藏品 id
  selectCollectionFavoriteIdList: () => object;
  // 获取我的收藏品收藏列表
  selectCollectionFavoriteList: (searchCondition: any) => object;
}

/**
 * 个人账户相关接口实现
 *
 */
const api: Api = {
  updateCollectionFavorite: (data: any) : object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/cli`,
      data
    );
  },
  selectCollectionFavoriteIdList: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/user_cli`,
      {}
    );
  },
  selectCollectionFavoriteList: (searchCondition: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/user_cli_list`,
      searchCondition
    );
  }
};

export default api;
