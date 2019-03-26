import ajax from '../../util/ajax';
// import config from '../../config';

/**
 * 公告相关接口
 *
 */
interface Api {
  // 获取公告分类
  selectNoticeCategory: () => {};
  // 获取公告列表
  selectNoticeList: (searchCondition: any) => {};
  // 获取公告详情
  selectNoticeDetail: (id: any) => {};
}

/**
 * 账户相关接口实现
 *
 */
const api: Api = {
  selectNoticeCategory: ():object => {
    return ajax(
      'GET',
      `http://106.13.107.45/ArticleCate`
    );
  },
  selectNoticeList: (searchCondition: any): object => {
    return ajax(
      'GET',
      `http://106.13.107.45/ArticleList`,
      searchCondition
    );
  },
  selectNoticeDetail: (id: any): object => {
    return ajax(
      'GET',
      `http://106.13.107.45/AeRead/${id}`
    );
  }
};

export default api;
