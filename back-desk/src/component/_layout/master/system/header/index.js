import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Breadcrumb, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
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
  class LayoutSystemHeader extends React.Component {
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

    state = {
      routeMatchList: [],
      showBreadcrumb: true
    };


    /**
     * 刷新面包屑导航
     *
     */
    refreshBreadcrumb = () => {
      const { props, state } = this;
      // 防止重复刷新视图
      if (state.routeMatchList === props.routeMatchList) {
        return false;
      } else {
        // 每次路由改变(隐藏面包屑, 等待 300 毫秒在显示)
        setTimeout(() => {
          this.setState({
            // 改变面包屑为当前路由对应的数据
            routeMatchList: props.routeMatchList,
            showBreadcrumb: false
          });
        }, 0);
        setTimeout(() => {
          this.setState({
            showBreadcrumb: true
          });
        }, 200);
      }
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
      const { props, state } = this;
      props.location.pathname && this.refreshBreadcrumb();
      return (
        <section className="layout-system-header-container">

          {/* 顶部操作栏 */}
          <section className="header-top-container">
            <section className="system-collapse-sidebar-action-container" onClick={() => props.toggleSystemSidebarIsCollapse()}>
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
          <QueueAnim type={['right', 'right']} duration={200} className="header-bottom-container">
            {state.showBreadcrumb ? (
              <Breadcrumb key={'breadcrumb'}>
                {state.routeMatchList.map((routeMatch, index) => (
                  <Breadcrumb.Item key={index}>{routeMatch.route.breadcrumb}</Breadcrumb.Item>
                ))}
              </Breadcrumb>
            ) : null}
          </QueueAnim>
        </section>
      );
    }
  }
));
