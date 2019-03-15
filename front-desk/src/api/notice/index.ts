import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 公告相关接口
 *
 */
interface Api {
  // 获取公告列表
  selectList: (searchCondition: any) => {};
  // 获取公告详情
  selectDetail: (id: any) => {};
}

/**
 * 账户相关接口实现
 *
 */
const api: Api = {
  selectList: (searchCondition: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/notice/list`,
      searchCondition
    );
  },
  selectDetail: (id: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/notice/detail/${id}`
    );
  }
};

export default api;
