import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 账户相关接口
 *
 */
interface Api {
  // 注册
  signUp: (data: any) => {};
  // 登陆
  signIn: (data: any) => {};
  // 退出
  signOut: () => {};
  // 获取当前登陆的用户信息
  selectUserInfo: () => {};
  // 发送短信验证码
  sendCaptcha: (data: any) => {};
}

/**
 * 账户相关接口实现
 *
 */
const api: Api = {
  signUp: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/account/signUp`,
      data
    );
  },
  signIn: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/account/signIn`,
      data
    );
  },
  signOut: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/account/signOut`,
      {}
    );
  },
  selectUserInfo: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/account/userInfo`,
      {}
    );
  },
  sendCaptcha: (data: any):object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/account/sendCaptcha`,
      data
    );
  }
};

export default api;
