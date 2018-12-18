// state
const initState = {};

// action type
const CLEAR_ACCOUNT_STATE = 'clearAccountState';

// action
// 清除此模块的所有组件
export const clearAccountState = () => {
  return {
    type: CLEAR_ACCOUNT_STATE
  };
};

// reducer
export default (state = initState, action = {}) => {
  switch (action.type) {
    case CLEAR_ACCOUNT_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
}
