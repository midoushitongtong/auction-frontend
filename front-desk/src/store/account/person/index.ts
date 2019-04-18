// 当前模块的类型声明
export interface State {
  // 我的已收藏的收藏品id
  collectionFavoriteIdList: any;
}

// action type
enum ActionType {
  UPDATE_COLLECTION_FAVORITE_ID_LIST = 'updateCollectionFavoriteIdList',
  CLEAR_ACCOUNT_PERSON_STATE = 'clearAccountPersonState'
}

// state
const initState: State = {
  collectionFavoriteIdList: []
};

// action
// 修改我的已收藏的收藏品id
export const updateCollectionFavoriteIdList = (collectionFavoriteIdList: any) => {
  return {
    type: ActionType.UPDATE_COLLECTION_FAVORITE_ID_LIST,
    data: {
      collectionFavoriteIdList
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
    case ActionType.UPDATE_COLLECTION_FAVORITE_ID_LIST:
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
