import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteConfigComponentProps, MatchedRoute } from 'react-router-config';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Dropdown, Menu, Breadcrumb, Icon } from 'antd';
import NProgress from 'nprogress';
import { toggleSystemSidebarIsCollapse } from '../../../../../store/system-style';
import { clearAccountState } from '../../../../../store/account';
import { AppStateType } from '../../../../../store';
import './index.scss';

// 当前组件的类型声明
interface ConnectState {
  // 当前登陆的用户信息
  userInfo: any
}

interface ConnectDispatch {
  toggleSystemSidebarIsCollapse: () => {},
  clearAccountState: () => {}
}

interface Props extends ConnectState, ConnectDispatch, RouteConfigComponentProps {
  // 当前路由信息
  routeMatchList: MatchedRoute<{}>[]
}

interface State {
  isRender: boolean
}

// 当前组件类
export default compose<React.ComponentClass>(
  withRouter,
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppStateType) => ({
      userInfo: state.account.userInfo
    }),
    {
      toggleSystemSidebarIsCollapse,
      clearAccountState
    }
  )
)(
  class LayoutMasterSystemHeader extends React.Component<Props, State> {
    /**
     * 用户退出操作
     *
     */
    public signOut = async () => {
      const { props } = this;
      NProgress.start();
      // await api.account.signOut();
      // 清空用户状态
      props.clearAccountState();
      // 跳转
      setTimeout(() => {
        NProgress.done();
        props.history.push('/account/signIn');
      }, 500);
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="layout-master-system-header-container">

          {/* 顶部操作栏 */}
          <section className="header-top-container">
            <section
              className="system-collapse-sidebar-action-container"
              onClick={() => props.toggleSystemSidebarIsCollapse()}
            >
              <Icon type="menu"/>
            </section>
            <section className="nav-container">
              <div className="nav-item current-sign-in-user">
                <Dropdown overlay={(
                  <Menu>
                    <Menu.Item key="1" onClick={this.signOut}>退出登录</Menu.Item>
                  </Menu>
                )}>
                  <span>{props.userInfo.username || 'admin'}</span>
                </Dropdown>
              </div>
            </section>
          </section>

          {/* 根据路由渲染面包屑 */}
          <TransitionGroup className="header-bottom-container">
            <CSSTransition
              key={props.location.pathname}
              classNames="system-slide-left"
              timeout={200}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <Breadcrumb>
                {props.routeMatchList.map((routeMatch: any, index: number) => (
                  <Breadcrumb.Item key={index}>{routeMatch.route.breadcrumb}</Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </CSSTransition>
          </TransitionGroup>
        </section>
      );
    };
  }
) as any;
