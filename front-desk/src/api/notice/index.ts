import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 公告相关接口
 *
 */
interface Api {
  // 获取公告分类
  selectNoticeCategory: () => object;
  // 获取公告列表
  selectNoticeList: (searchCondition: any) => object;
  // 获取公告详情
  selectNoticeDetail: (id: any) => object;
}

/**
 * 公告相关接口实现
 *
 */
const api: Api = {
  selectNoticeCategory: ():object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/ArticleCate`
    );
  },
  selectNoticeList: (searchCondition: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/ArticleList`,
      searchCondition
    );
  },
  selectNoticeDetail: (id: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/AeRead/${id}`
    );
  }
};

export default api;
