import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Router from "./router";
// normal
import 'normalize.css';
// index.css
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    {/* 渲染路由组件 */}
    <Router/>
  </Provider>,
  document.getElementById('root')
);
