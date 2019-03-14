import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import account, { State as AccountState } from './account';
import collection, { State as CollectionState } from './collection';

// 当前模块的类型声明
// 所有 state 的类型声明
export interface AppState {
  account: AccountState;
  collection: CollectionState;
}

// 暴露 store 对象
export function initializeStore (initialState: any) {
  return createStore(
    // 封装 reducer 集合
    combineReducers({
      account,
      collection
    }),
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk))
  )
}
