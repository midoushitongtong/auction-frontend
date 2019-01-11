import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import account, { State as AccountState } from './account/index';

// 当前模块的类型声明
export interface AppStateType {
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
