import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import ErrorNotFound from '../component/error/not-found';
import Loading from '../component/loading';
import LayoutMaster from '../page/_layout/master';

// 账户页面(登陆)
import LayoutMasterAccount from '../page/_layout/master/account';

import LayoutMasterAccountSignIn from '../page/_layout/master/account/sign-in';

// 系统页面(所有功能模块)
import LayoutMasterSystem from '../page/_layout/master/system';

import LayoutMasterSystemHome from '../page/_layout/master/system/home';
import LayoutMasterSystemHomeWelcome from '../page/_layout/master/system/home/welcome';

import LayoutMasterSystemUserPerson from '../page/_layout/master/system/user/person';
import LayoutMasterSystemUserPersonList from '../page/_layout/master/system/user/person/list';
import LayoutMasterSystemUserPersonOperator from '../page/_layout/master/system/user/person/operator';

import LayoutMasterSystemProductCollection from '../page/_layout/master/system/product/collection';
import LayoutMasterSystemProductCollectionList from '../page/_layout/master/system/product/collection/list';
import LayoutMasterSystemProductCollectionOperator from '../page/_layout/master/system/product/collection/operator';

// 懒加载用户模块
const LayoutMasterSystemUser = Loadable({
  loader: () => import('../page/_layout/master/system/user'),
  loading: () => {
    return <Loading/>;
  }
});

// 懒加载产品模块
const LayoutMasterSystemProduct = Loadable({
  loader: () => import('../page/_layout/master/system/product'),
  loading: () => {
    return <Loading/>;
  }
});

export default class Router extends React.Component {
  state = {
    routeList: [
      {
        // 根模块
        path: '/',
        component: LayoutMaster,
        routes: [
          // 账户登陆模块
          {
            path: '/account',
            component: LayoutMasterAccount,
            routes: [
              {
                path: '/account/signIn',
                component: LayoutMasterAccountSignIn
              }
            ]
          },
          {
            // 系统模块
            path: '/system',
            component: LayoutMasterSystem,
            routes: [
              // 仪表盘模块
              {
                path: '/system/home',
                component: LayoutMasterSystemHome,
                breadcrumb: '仪表盘',
                routes: [
                  {
                    path: '/system/home/welcome',
                    component: LayoutMasterSystemHomeWelcome,
                    breadcrumb: '工作台'
                  },
                  {
                    path: '',
                    component: ErrorNotFound
                  }
                ]
              },
              // 用户模块
              {
                path: '/system/user',
                component: LayoutMasterSystemUser,
                breadcrumb: '用户',
                routes: [
                  {
                    path: '/system/user/person',
                    component: LayoutMasterSystemUserPerson,
                    breadcrumb: '个人用户',
                    routes: [
                      {
                        path: '/system/user/person/list',
                        component: LayoutMasterSystemUserPersonList,
                        breadcrumb: '列表'
                      },
                      {
                        path: '/system/user/person/operator/:id',
                        component: LayoutMasterSystemUserPersonOperator,
                        breadcrumb: '编辑'
                      },
                      {
                        path: '/system/user/person/operator',
                        component: LayoutMasterSystemUserPersonOperator,
                        breadcrumb: '添加'
                      }
                    ]
                  }
                ]
              },
              // 产品模块
              {
                path: '/system/product',
                component: LayoutMasterSystemProduct,
                breadcrumb: '产品',
                routes: [
                  {
                    path: '/system/product/collection',
                    component: LayoutMasterSystemProductCollection,
                    breadcrumb: '收藏品',
                    routes: [
                      {
                        path: '/system/product/collection/list',
                        component: LayoutMasterSystemProductCollectionList,
                        breadcrumb: '列表'
                      },
                      {
                        path: '/system/product/collection/operator/:id',
                        component: LayoutMasterSystemProductCollectionOperator,
                        breadcrumb: '编辑'
                      },
                      {
                        path: '/system/product/collection/operator',
                        component: LayoutMasterSystemProductCollectionOperator,
                        breadcrumb: '添加'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: '',
            component: () => <Redirect to='/system/home/welcome'/>
          }
        ]
      }
    ]
  };

  render = () => {
    const { state } = this;
    return (
      <BrowserRouter basename='/auction-frontend-back-desk'>
        {/* 分发所有路由组件的入口 */}
        {renderRoutes(state.routeList)}
      </BrowserRouter>
    );
  };
};
