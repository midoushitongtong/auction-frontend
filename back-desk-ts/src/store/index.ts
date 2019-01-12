import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import account, { State as AccountState } from './account';
import systemStyle, { State as SystemStyleState } from './system-style';

// 当前模块的类型声明
// 所有 state 的类型声明
export interface AppState {
  account: AccountState,
  systemStyle: SystemStyleState
}

// 暴露 store 对象
export default createStore(
  // 封装 reducer 集合
  combineReducers({
    account,
    systemStyle
  }),
  composeWithDevTools(applyMiddleware(reduxThunk))
);
