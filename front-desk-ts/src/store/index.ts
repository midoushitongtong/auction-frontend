import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import account, { State as AccountState } from './account';

// 当前模块的类型声明
// 所有 state 的类型声明
export interface AppState {
  account: AccountState
}

// 暴露 store 对象
export default createStore(
  // 封装 reducer 集合
  combineReducers({
    account
  }),
  composeWithDevTools(applyMiddleware(reduxThunk))
);
