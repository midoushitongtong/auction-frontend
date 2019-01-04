import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Dropdown, Menu, Breadcrumb, Icon } from 'antd';
import NProgress from 'nprogress';
import { toggleSystemSidebarIsCollapse } from "../../../../../store/system-style";
import { clearAccountState } from "../../../../../store/account/index";
import './index.scss';

export default withRouter(connect(
  state => {
    // mapStateToProps
    return {
      userInfo: state.account.userInfo
    };
  },
  // mapDispatchToProps
  {
    clearAccountState,
    toggleSystemSidebarIsCollapse
  }
)(
  class LayoutMasterSystemHeader extends React.Component {
    static propTypes = {
      // 当前登陆状态
      userInfo: PropTypes.object.isRequired,
      // 当前路由信息
      routeMatchList: PropTypes.array.isRequired,
      // 切换侧边栏是否折叠
      toggleSystemSidebarIsCollapse: PropTypes.func.isRequired,
      // 清空用户模块状态
      clearAccountState: PropTypes.func.isRequired
    };

    /**
     * 用户退出操作
     *
     */
    signOut = async () => {
      const { props } = this;
      NProgress.start();
      // await api.account.signOut();
      // 清空用户状态
      props.clearAccountState({});
      // 跳转
      setTimeout(() => {
        NProgress.done();
        props.history.push('/account/signIn');
      }, 500);
    };

    render() {
      const { props } = this;
      return (
        <section className="layout-master-system-header-container">

          {/* 顶部操作栏 */}
          <section className="header-top-container">
            <section className="system-collapse-sidebar-action-container"
                     onClick={() => props.toggleSystemSidebarIsCollapse()}>
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
                {props.routeMatchList.map((routeMatch, index) => (
                  <Breadcrumb.Item key={index}>{routeMatch.route.breadcrumb}</Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </CSSTransition>
          </TransitionGroup>
        </section>
      );
    }
  }
));
