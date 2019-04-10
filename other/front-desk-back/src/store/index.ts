import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import account, { State as AccountState } from './account';
import accountPerson, { State as AccountPersonState } from './account/person';
import collection, { State as CollectionState } from './collection';
import notice, { State as NoticeState } from './notice';

// 当前模块的类型声明
// 所有 state 的类型声明
export interface AppState {
  account: AccountState;
  accountPerson: AccountPersonState;
  collection: CollectionState,
  notice: NoticeState
}

// 暴露 store 对象
export function initializeStore (initialState: any) {
  return createStore(
    // 封装 reducer 集合
    combineReducers({
      account,
      accountPerson,
      collection,
      notice
    }),
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk))
  )
}
