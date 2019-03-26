// 当前模块的类型声明
export interface State {
  siteInfo: any;
}

// action type
enum ActionType {
  UPDATE_SITE_INFO = 'updateSieInfo',
  CLEAR_APP_STATE = 'clearAppState'
}

// state
const initState: State = {
  siteInfo: {}
};

// action
// 修改当前登陆的用户信息
export const updateSiteInfo = (siteInfo: any): object => {
  return {
    type: ActionType.UPDATE_SITE_INFO,
    data: {
      siteInfo
    }
  };
};

// 清空当前模块的状态
export const clearAppState = (): object => {
  return {
    type: ActionType.CLEAR_APP_STATE
  };
};

// reducer
export default (state = initState, action: any): any => {
  switch (action.type) {
    case ActionType.UPDATE_SITE_INFO:
      return {
        ...state,
        ...action.data
      };
    case ActionType.CLEAR_APP_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
