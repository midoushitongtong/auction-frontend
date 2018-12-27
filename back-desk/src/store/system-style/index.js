// state
const initState = {
  // 侧边栏是否折叠
  systemSidebarIsCollapse: window.localStorage.getItem('systemSidebarIsCollapse')
    ? window.localStorage.getItem('systemSidebarIsCollapse') === 'true'
    : false
};

// action type
const TOGGLE_SYSTEM_SIDEBAR_IS_COLLAPSE = 'toggleSystemSidebarIsCollapse';
const CLEAR_SYSTEM_STYLE_STATE = 'clearSystemStyleState';

// action
export const toggleSystemSidebarIsCollapse = () => {
  return {
    type: TOGGLE_SYSTEM_SIDEBAR_IS_COLLAPSE
  };
};

// 初始化状态 ===============================
export const clearSystemStyleState = () => {
  return {
    type: CLEAR_SYSTEM_STYLE_STATE
  };
};

// reducer
export default (state = initState, action = {}) => {
  switch (action.type) {
    case TOGGLE_SYSTEM_SIDEBAR_IS_COLLAPSE:
      const systemSidebarIsCollapse = !state.systemSidebarIsCollapse;
      console.log(systemSidebarIsCollapse);
      window.localStorage.setItem('systemSidebarIsCollapse', systemSidebarIsCollapse);
      return {
        ...state,
        systemSidebarIsCollapse
      };
    case CLEAR_SYSTEM_STYLE_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
}
