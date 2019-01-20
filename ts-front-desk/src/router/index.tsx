import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Loadable from 'react-loadable';
import Loading from '../component/loading';
import LayoutMaster from '../page/_layout/master';

// 懒加载模块
// 首页
const Home = Loadable({
  loader: () => import('../page/_layout/master/home'),
  loading: () => <Loading/>
});

// 收藏品页
const Collection = Loadable({
  loader: () => import('../page/_layout/master/collection'),
  loading: () => <Loading/>
});

// 当前组件的类型声明
export interface MyRouteConfig extends RouteConfig {
  // meta 信息
  meta?: {
    // 当前路由是否需要隐藏顶部
    hiddenHeader: boolean,
    // 当前路由是否需要隐藏底部
    hiddenFooter?: boolean
  },
  // 约束子路由
  routes?: MyRouteConfig[]
}

interface Props {
}

interface State {
  routeList: MyRouteConfig[]
}

// 当前组件类
export default class Router extends React.Component<Props, State> {
  public state: State = {
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

  public render = (): JSX.Element => {
    const { state } = this;
    return (
      <BrowserRouter basename='/auction-frontend-front-desk'>
        {/* 分发所有路由组件的入口 */}
        {renderRoutes(state.routeList)}
      </BrowserRouter>
    );
  };
}
