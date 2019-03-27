// 当前模块的类型声明
export interface State {
  // 收藏品的搜索条件
  collectionSearchCondition: any;
  // 当前收藏品的搜索条件
  currentCollectionSearchCondition: any;
  // 收藏品的搜索结果集
  collectionSearchResult: any;
  // 收藏品的搜索详情
  collectionSearchDetail: any;
}

// action type
enum ActionType {
  UPDATE_COLLECTION_SEARCH_CONDITION = 'updateCollectionSearchCondition',
  UPDATE_CURRENT_COLLECTION_SEARCH_CONDITION = 'updateCurrentCollectionSearchCondition',
  UPDATE_COLLECTION_SEARCH_RESULT = 'updateCollectionSearchResult',
  UPDATE_COLLECTION_SEARCH_DETAIL = 'updateCollectionSearchDetail',
  CLEAR_COLLECTION_STATE = 'clearCollectionState'
}

// state
const initState: State = {
  collectionSearchCondition: {
    categoryList: [],
    transactionList: [],
    areaList: [],
    keyword: ''
  },
  currentCollectionSearchCondition: {},
  collectionSearchResult: {},
  collectionSearchDetail: {}
};

// action
// 修改收藏品的搜索条件
export const updateCollectionSearchCondition = (collectionSearchCondition: any): object => {
  return {
    type: ActionType.UPDATE_COLLECTION_SEARCH_CONDITION,
    data: {
      collectionSearchCondition
    }
  };
};
// 修改当前收藏品的搜索条件
export const updateCurrentCollectionSearchCondition = (currentCollectionSearchCondition: any): object => {
  return {
    type: ActionType.UPDATE_CURRENT_COLLECTION_SEARCH_CONDITION,
    data: {
      currentCollectionSearchCondition
    }
  };
};
// 修改当前收藏品的搜索集合
export const updateCollectionSearchResult = (collectionSearchResult: any): object => {
  return {
    type: ActionType.UPDATE_COLLECTION_SEARCH_RESULT,
    data: {
      collectionSearchResult
    }
  };
};
// 修改当前收藏品的搜索详情
export const updateCollectionSearchDetail = (collectionSearchDetail: any): object => {
  return {
    type: ActionType.UPDATE_COLLECTION_SEARCH_RESULT,
    data: {
      collectionSearchDetail
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
    case ActionType.UPDATE_COLLECTION_SEARCH_CONDITION:
      return {
        ...state,
        ...action.data
      };
    case ActionType.UPDATE_CURRENT_COLLECTION_SEARCH_CONDITION:
      return {
        ...state,
        ...action.data
      };
    case ActionType.UPDATE_COLLECTION_SEARCH_RESULT:
      return {
        ...state,
        ...action.data
      };
    case ActionType.UPDATE_COLLECTION_SEARCH_DETAIL:
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
