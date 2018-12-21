import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import LayoutMaster from '../page/_layout/master';
import Home from '../page/home';
import Collection from '../page/collection';

export default class Router extends React.Component {
  state = {
    routeList: [
      {
        // 根模块
        path: '/',
        component: LayoutMaster,
        routes: [
          {
            // 首页
            path: '/home',
            component: Home
          },
          {
            // 收藏品查询页
            path: '/collection',
            component: Collection
          },
          {
            path: '',
            component: () => <Redirect to='/home'/>
          }
        ]
      }
    ]
  };

  render() {
    const { state } = this;
    return (
      <BrowserRouter basename='/'>
        {/* 分发所有路由组件的入口 */}
        {renderRoutes(state.routeList)}
      </BrowserRouter>
    );
  }
};
