// 当前模块的类型声明
export interface State {
  // 当前我的收藏品的搜索条件
  currentAccountPersonCollectionFavoriteSearchCondition: any;
  // 我的收藏品的搜索结果集
  accountPersonCollectionFavoriteSearchResult: any;
}

// action type
enum ActionType {
  UPDATE_CURRENT_ACCOUNT_PERSON_COLLECTION_FAVORITE_SEARCH_CONDITION = 'updateCurrentAccountPersonCollectionFavoriteSearchCondition',
  UPDATE_ACCOUNT_PERSON_COLLECTION_FAVORITE_SEARCH_RESULT = 'updateAccountPersonCollectionFavoriteSearchResult',
  CLEAR_ACCOUNT_PERSON_STATE = 'clearAccountPersonState'
}

// state
const initState: State = {
  currentAccountPersonCollectionFavoriteSearchCondition: {},
  accountPersonCollectionFavoriteSearchResult: {}
};

// action
// 修改当前我的收藏品的搜索条件
export const updateCurrentAccountPersonCollectionFavoriteSearchCondition = (currentAccountPersonCollectionFavoriteSearchCondition: any): object => {
  return {
    type: ActionType.UPDATE_CURRENT_ACCOUNT_PERSON_COLLECTION_FAVORITE_SEARCH_CONDITION,
    data: {
      currentAccountPersonCollectionFavoriteSearchCondition
    }
  };
};
// 修改我的收藏品搜索的结果集
export const updateAccountPersonCollectionFavoriteSearchResult = (accountPersonCollectionFavoriteSearchResult: any): object => {
  return {
    type: ActionType.UPDATE_ACCOUNT_PERSON_COLLECTION_FAVORITE_SEARCH_RESULT,
    data: {
      accountPersonCollectionFavoriteSearchResult
    }
  };
};
// 清空当前模块的状态
export const clearAccountPersonState = (): object => {
  return {
    type: ActionType.CLEAR_ACCOUNT_PERSON_STATE
  };
};

// reducer
export default (state = initState, action: any): any => {
  switch (action.type) {
    case ActionType.UPDATE_CURRENT_ACCOUNT_PERSON_COLLECTION_FAVORITE_SEARCH_CONDITION:
      return {
        ...state,
        ...action.data
      };
    case ActionType.UPDATE_ACCOUNT_PERSON_COLLECTION_FAVORITE_SEARCH_RESULT:
      return {
        ...state,
        ...action.data
      };
    case ActionType.CLEAR_ACCOUNT_PERSON_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
