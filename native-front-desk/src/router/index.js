import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

// 普通组件
import Loading from '../component/loading';
import LayoutMaster from '../page/_layout/master';

// 懒加载首页模块
const Home = Loadable({
  loader: () => import('../page/home'),
  loading: () => {
    return <Loading/>;
  }
});

// 懒加载收藏品模块
const Collection = Loadable({
  loader: () => import('../page/collection'),
  loading: () => {
    return <Loading/>;
  }
});

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
        <BrowserRouter basename='/auction-frontend-front-desk'>
          {/* 分发所有路由组件的入口 */}
          {renderRoutes(state.routeList)}
        </BrowserRouter>
      );
    }
  }
);
