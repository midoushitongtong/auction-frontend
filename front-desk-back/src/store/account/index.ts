// 当前模块的类型声明
export interface State {
  // 当前登陆的用户信息
  userInfo: any;
}

// action type
enum ActionType {
  UPDATE_USER_INFO = 'updateUserInfo',
  CLEAR_ACCOUNT_STATE = 'clearAccountState'
}

// state
const initState: State = {
  userInfo: {}
};

// action
// 修改当前登陆的用户信息
export const updateUserInfo = (userInfo: any): object => {
  return {
    type: ActionType.UPDATE_USER_INFO,
    data: {
      userInfo
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
