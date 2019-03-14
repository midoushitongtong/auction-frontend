import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 公告相关接口
 *
 */
interface Api {
  // 获取公告列表
  getList: (searchCondition: any) => {}
  // 获取公告详情
  getDetail: (id: any) => {};
}

/**
 * 账户相关接口实现
 *
 */
const api: Api = {
  getList: (searchCondition: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/notice/list`,
      searchCondition
    );
  },
  getDetail: (id: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/notice/detail/${id}`
    );
  }
};

export default api;
