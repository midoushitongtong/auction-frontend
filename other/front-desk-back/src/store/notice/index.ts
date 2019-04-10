// 当前模块的类型声明
export interface State {
  // 当前公告的搜索条件
  currentNoticeSearchCondition: any;
  // 公告的搜索结果集
  noticeSearchResult: any;
}

// action type
enum ActionType {
  UPDATE_CURRENT_NOTICE_SEARCH_CONDITION = 'updateCurrentNoticeSearchCondition',
  UPDATE_NOTICE_SEARCH_RESULT = 'updateNoticeSearchResult',
  CLEAR_NOTICE_STATE = 'clearNoticeState'
}

// state
const initState: State = {
  currentNoticeSearchCondition: {},
  noticeSearchResult: {}
};

// action
// 修改当前公告的搜索条件
export const updateCurrentNoticeSearchCondition = (currentNoticeSearchCondition: any): object => {
  return {
    type: ActionType.UPDATE_CURRENT_NOTICE_SEARCH_CONDITION,
    data: {
      currentNoticeSearchCondition
    }
  };
};
// 修改当前公告的搜索结果集
export const updateNoticeSearchResult = (noticeSearchResult: any): object => {
  return {
    type: ActionType.UPDATE_NOTICE_SEARCH_RESULT,
    data: {
      noticeSearchResult
    }
  };
};
// 清空当前模块的状态
export const clearNoticeState = (): object => {
  return {
    type: ActionType.CLEAR_NOTICE_STATE
  };
};

// reducer
export default (state = initState, action: any): any => {
  switch (action.type) {
    case ActionType.UPDATE_CURRENT_NOTICE_SEARCH_CONDITION:
      return {
        ...state,
        ...action.data
      };
    case ActionType.UPDATE_NOTICE_SEARCH_RESULT:
      return {
        ...state,
        ...action.data
      };
    case ActionType.CLEAR_NOTICE_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};