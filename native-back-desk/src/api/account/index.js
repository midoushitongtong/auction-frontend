import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 账户相关接口
 *
 */
export default {
  // 登陆
  signIn(data) {
    return ajax(
      'POST',
      `${config.API_ROOT}/manager/signIn`,
      data
    );
  },
  // 退出
  signOut() {
    return ajax(
      'GET',
      `${config.API_ROOT}/manager/signOut`,
      {}
    );
  },
  // 获取用户信息
  selectUserInfo() {
    return ajax(
      'GET',
      `${config.API_ROOT}/manager/userInfo`,
      {}
    );
  }
};
