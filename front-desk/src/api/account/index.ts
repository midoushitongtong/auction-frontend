import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 账户相关接口
 *
 */
interface Api {
  // 注册
  signUp: (data: any) => object;
  // 登陆
  signIn: (data: any) => object;
  // 退出
  signOut: () => object;
  // 获取当前登陆的用户信息
  selectUserInfo: () => object;
  // 发送短信验证码
  sendCaptcha: (data: any) => object;
  // 修改用户信息
  updateUserInfo: (data: any) => object;
}

/**
 * 账户相关接口实现
 *
 */
const api: Api = {
  signUp: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/code`,
      data
    );
  },
  signIn: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/code`,
      data
    );
  },
  signOut: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/check`,
      {}
    );
  },
  selectUserInfo: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/decide`,
      {}
    );
  },
  sendCaptcha: (data: any): object => {
    return ajax(
      'POST',
      `${config.MOCK_API_ROOT}/account/sendCaptcha`,
      data
    );
  },
  updateUserInfo: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/set`,
      data
    );
  }
};

export default api;
