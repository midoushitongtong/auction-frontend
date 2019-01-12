import React from 'react';
import { renderRoutes, matchRoutes, RouteConfigComponentProps } from 'react-router-config';
import { MyRouteConfig } from '../../../router';
import LayoutHeader from '../../../component/_layout/master/header';
import LayoutFooter from '../../../component/_layout/master/footer';
import './index.scss';

// 当前组件的类型声明
interface Props extends RouteConfigComponentProps {
}

interface State {
}

// 当前组件类
export default class LayoutMaster extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    const { props } = this;
    // 根路由进行跳转
    if (props.location.pathname === '/') {
      console.log('redirecting...');
      window.location.href = '/auction-frontend-front-desk/home';
    } else {
      // 获取当前路由信息
      if (props.route && props.route.routes) {
        const currentRoute: MyRouteConfig = matchRoutes(props.route.routes, props.location.pathname)[0].route;
        return (
          <section className='layout-master-container'>
            {/* 公共头部, 根据路由信息判断是否需要隐藏公共头部 */}
            {currentRoute.meta && currentRoute.meta.hiddenHeader ? '' : <LayoutHeader/>}

            {/* 所有路由组件的入口 */}
            {renderRoutes(props.route.routes)}

            {/* 公共底部, 根据路由信息判断是否需要隐藏公共底部 */}
            {currentRoute.meta && currentRoute.meta.hiddenFooter ? '' : <LayoutFooter/>}
          </section>
        );
      }
    }
    return (
      <section>跳转中...</section>
    );
  };
}
