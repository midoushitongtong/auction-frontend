import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Promise from 'babel-polyfill';
import store from './store';
// 全局 css
import 'normalize.css';
import 'nprogress/nprogress.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// 根组件
import App from './App';
// ie11 promise 兼容
if (!window.Promise) {
  window.Promise = Promise;
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
