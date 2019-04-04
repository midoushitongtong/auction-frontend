import ajax from '../../util/ajax';
// import config from '../../config';

/**
 * 公共相关接口
 *
 */
interface Api {
  // 获取轮播图
  selectCarouselList: () => object;
}

/**
 * 公共相关接口实现
 *
 */
const api: Api = {
  selectCarouselList: ():object => {
    return ajax(
      'GET',
      `http://106.13.107.45/Lubotu`
    );
  }
};

export default api;
