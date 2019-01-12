import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 账户相关接口
 *
 */
interface Api {
  // 登陆
  signIn: (data: any) => {},
  // 退出
  signOut: () => {},
  // 获取当前登陆的用户信息
  selectUserInfo: () => {}
}

/**
 * 账户相关接口实现
 *
 */
const api:Api = {
  signIn(data: any): object {
    return ajax(
      'POST',
      `${config.API_ROOT}/manager/signIn`,
      data
    );
  },
  signOut(): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/manager/signOut`,
      {}
    );
  },
  selectUserInfo(): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/manager/userInfo`,
      {}
    );
  }
};

export default api;
