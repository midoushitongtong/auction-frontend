import api from '../../api';

// state
const initState = {
  // 已登录用户信息
  userInfo: {}
};

// action type
const UPDATE_USER_INFO = 'updateUserInfo';
const CLEAR_ACCOUNT_STATE = 'clearAccountState';

// action
export const updateUserInfo = (userInfo) => {
  return {
    type: UPDATE_USER_INFO,
    data: {
      userInfo
    }
  };
};

export const asyncUpdateUserInfo = () => {
  return async dispatch => {
    const result = await api.account.selectUserInfo();
    if (result.code === '0') {
      dispatch({
        type: UPDATE_USER_INFO,
        data: {
          userInfo: result.data
        }
      });
    }
  };
};

// 初始化状态 ===============================
export const clearAccountState = () => {
  return {
    type: CLEAR_ACCOUNT_STATE
  };
};

// reducer
export default (state = initState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        ...action.data
      };
    case CLEAR_ACCOUNT_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
}
