// 当前模块的类型声明
export interface State {
  // 侧边栏折叠状态
  systemSidebarIsCollapse: boolean
}

// 操作类型
enum ActionType {
  TOGGLE_SYSTEM_SIDEBAR_IS_COLLAPSE = 'toggleSystemSidebarIsCollapse',
  CLEAR_SYSTEM_STYLE_STATE = 'clearSystemStyleState'
}

// 状态
const initState: State = {
  // 获取侧边栏折叠状态
  systemSidebarIsCollapse: window.localStorage.getItem('systemSidebarIsCollapse') === 'true'
};

// 操作函数
// toggle 侧边栏折叠状态
export const toggleSystemSidebarIsCollapse = (): object => {
  return {
    type: ActionType.TOGGLE_SYSTEM_SIDEBAR_IS_COLLAPSE
  };
};

// 清空当前模块的状态
export const clearSystemStyleState = (): object => {
  return {
    type: ActionType.CLEAR_SYSTEM_STYLE_STATE
  };
};

// reducer
export default (state = initState, action: any): any => {
  switch (action.type) {
    case ActionType.TOGGLE_SYSTEM_SIDEBAR_IS_COLLAPSE:
      const systemSidebarIsCollapse = !state.systemSidebarIsCollapse;
      // 缓存到 localStorage
      window.localStorage.setItem('systemSidebarIsCollapse', systemSidebarIsCollapse ? 'true' : 'false');
      return {
        ...state,
        systemSidebarIsCollapse
      };
    case ActionType.CLEAR_SYSTEM_STYLE_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
