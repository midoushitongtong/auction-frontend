import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import ErrorNotFound from '../component/error/not-found';
import LayoutMaster from '../page/_layout/master';
import LayoutMasterAccount from '../page/_layout/master/account';
import LayoutMasterSystem from '../page/_layout/master/system';
import AccountSignIn from '../page/account/sign-in';
import SystemHome from '../page/system/home';
import SystemHomeWelcome from '../page/system/home/welcome';
import SystemUser from '../page/system/user';
import SystemUserPerson from '../page/system/user/person';
import SystemUserPersonList from '../page/system/user/person/list';
import SystemUserPersonOperator from '../page/system/user/person/operator';
import SystemProduct from '../page/system/product';
import SystemProductCollection from '../page/system/product/collection';
import SystemProductCollectionList from '../page/system/product/collection/list';
import SystemProductCollectionOperator from '../page/system/product/collection/operator';

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
            // 账户登陆模块
            {
              path: '/account',
              component: LayoutMasterAccount,
              routes: [
                {
                  path: '/account/signIn',
                  component: AccountSignIn
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
                  component: SystemHome,
                  breadcrumb: '仪表盘',
                  routes: [
                    {
                      path: '/system/home/welcome',
                      component: SystemHomeWelcome,
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
                  component: SystemUser,
                  breadcrumb: '用户',
                  routes: [
                    {
                      path: '/system/user/person',
                      component: SystemUserPerson,
                      breadcrumb: '个人用户',
                      routes: [
                        {
                          path: '/system/user/person/list',
                          component: SystemUserPersonList,
                          breadcrumb: '列表'
                        },
                        {
                          path: '/system/user/person/operator/:id',
                          component: SystemUserPersonOperator,
                          breadcrumb: '编辑'
                        },
                        {
                          path: '/system/user/person/operator',
                          component: SystemUserPersonOperator,
                          breadcrumb: '添加'
                        }
                      ]
                    }
                  ]
                },
                // 产品模块
                {
                  path: '/system/product',
                  component: SystemProduct,
                  breadcrumb: '产品',
                  routes: [
                    {
                      path: '/system/product/collection',
                      component: SystemProductCollection,
                      breadcrumb: '收藏品',
                      routes: [
                        {
                          path: '/system/product/collection/list',
                          component: SystemProductCollectionList,
                          breadcrumb: '列表'
                        },
                        {
                          path: '/system/product/collection/operator/:id',
                          component: SystemProductCollectionOperator,
                          breadcrumb: '编辑'
                        },
                        {
                          path: '/system/product/collection/operator',
                          component: SystemProductCollectionOperator,
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

    render() {
      const { state } = this;
      return (
        <BrowserRouter basename='/'>
          {renderRoutes(state.routeList)}
        </BrowserRouter>
      );
    }
  }
);
