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
export const updateUserInfo = (userInfo: object) => {
  return {
    type: ActionType.UPDATE_USER_INFO,
    data: {
      userInfo
    }
  };
};

export const asyncUpdateUserInfo = () => {
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

export const clearAccountState = () => {
  return {
    type: ActionType.CLEAR_ACCOUNT_STATE
  };
};

// reducer
export default (state = initState, action: any) => {
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
}
