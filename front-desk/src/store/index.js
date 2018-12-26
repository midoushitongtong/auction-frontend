/*
  redux 核心模块

 */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import account from './account/index';

// 暴露 store 对象
export default createStore(
  // 封装 reducer 集合
  combineReducers({
    account
  }),
  composeWithDevTools(applyMiddleware(reduxThunk))
);