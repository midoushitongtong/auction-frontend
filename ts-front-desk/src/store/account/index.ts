import api from '../../api';

// 当前模块的类型声明
export interface State {
  userInfo: object
}

// 操作类型
enum ActionType {
  UPDATE_USER_INFO = 'updateUserInfo',
  CLEAR_ACCOUNT_STATE = 'clearAccountState'
}

// 状态
const initState: State = {
  // 已登录用户信息
  userInfo: {}
};

// 操作函数
// 修改当前登陆的用户信息
export const updateUserInfo = (userInfo: object): object => {
  return {
    type: ActionType.UPDATE_USER_INFO,
    data: {
      userInfo
    }
  };
};

// 异步修改当前登陆的用户信息
export const asyncUpdateUserInfo = (): object => {
  return async (dispatch: any) => {
    const result: any = await api.account.selectUserInfo();
    if (result.code === '0') {
      dispatch({
        type: ActionType.UPDATE_USER_INFO,
        data: {
          userInfo: result.data
        }
      });
    }
  };
};

// 清空当前模块的状态
export const clearAccountState = (): object => {
  return {
    type: ActionType.CLEAR_ACCOUNT_STATE
  };
};

// reducer
export default (state = initState, action: any): any => {
  switch (action.type) {
    case ActionType.UPDATE_USER_INFO:
      return {
        ...state,
        ...action.data
      };
    case ActionType.CLEAR_ACCOUNT_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
