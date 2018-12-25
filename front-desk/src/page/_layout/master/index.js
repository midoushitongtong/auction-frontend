import React from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import LayoutHeader from "../../../component/_layout/header";
import LayoutFooter from "../../../component/_layout/footer";
import './index.scss';

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  class LayoutMaster extends React.Component {
    render() {
      const { props } = this;
      // 根路由进行跳转
      if (props.location.pathname === '/') {
        console.log('redirecting...');
        window.location.href = '/auction-frontend-front-desk/home';
        return '';
      }
      // 获取当前路由信息
      const currentRoute = matchRoutes(props.route.routes, props.location.pathname)[0].route;
      return (
        <section className="layout-master-container">
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
);
