// 当前模块的类型声明
export interface State {
  // 搜索条件
  searchCondition: any,
  // 当前搜索条件
  currentSearchCondition: any
}

// 操作类型
enum ActionType {
  UPDATE_SEARCH_CONDITION = 'updateSearchCondition',
  UPDATE_CURRENT_SEARCH_CONDITION = 'updateCurrentSearchCondition',
  CLEAR_COLLECTION_STATE = 'clearCollectionState'
}

// 状态
const initState: State = {
  searchCondition: {
    categoryList: [],
    transactionList: [],
    areaList: [],
    keyword: ''
  },
  currentSearchCondition: {
    category: 0,
    transaction: 0,
    area: [],
    keyword: ''
  }
};

// 操作函数
// 修改当前搜索条件
export const updateSearchCondition = (searchCondition: any): object => {
  return {
    type: ActionType.UPDATE_SEARCH_CONDITION,
    data: {
      searchCondition
    }
  };
};

export const updateCurrentSearchCondition = (currentSearchCondition: any): object => {
  return {
    type: ActionType.UPDATE_CURRENT_SEARCH_CONDITION,
    data: {
      currentSearchCondition
    }
  };
};

// 异步初始化搜索条件
export const asyncInitSearchCondition = async () => {
  const result: any = await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  console.log(123);
  return {
    type: ActionType.UPDATE_SEARCH_CONDITION,
    data: {
      searchCondition: result
    }
  };
};

// 清空当前模块的状态
export const clearCollectionState = (): object => {
  return {
    type: ActionType.CLEAR_COLLECTION_STATE
  };
};

// reducer
export default (state = initState, action: any): any => {
  switch (action.type) {
    case ActionType.UPDATE_SEARCH_CONDITION:
      return {
        ...state,
        ...action.data
      };
    case ActionType.UPDATE_CURRENT_SEARCH_CONDITION:
      return {
        ...state,
        ...action.data
      };
    case ActionType.CLEAR_COLLECTION_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
