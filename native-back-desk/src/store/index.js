/*
  redux 最核心的管理对象模块
 */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import account from './account';
import systemStyle from './system-style';

// 暴露 store 对象
export default createStore(
  // 封装 reducer 集合
  combineReducers({
    account,
    systemStyle
  }),
  composeWithDevTools(applyMiddleware(reduxThunk))
);
