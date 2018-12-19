import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import LayoutMaster from '../page/_layout/master';
import home from '../page/home';

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  class Router extends React.Component {
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
              component: home
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
  }
);
