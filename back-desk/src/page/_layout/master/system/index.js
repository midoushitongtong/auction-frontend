import React from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LayoutSystemSidebar from "../../../../component/_layout/master/system/sidebar/index";
import LayoutSystemHeader from "../../../../component/_layout/master/system/header/index";

import './index.scss';

export default connect(
  // mapStateToProps
  state => {
    return {
      systemSidebarIsCollapse: state.systemStyle.systemSidebarIsCollapse,
      userInfo: state.account.userInfo
    };
  },
  // mapDispatchToProps
  {}
)(
  class LayoutMasterSystem extends React.Component {
    static propTypes = {
      // 当前登陆状态
      userInfo: PropTypes.object.isRequired,
      // 侧边栏是否折叠
      systemSidebarIsCollapse: PropTypes.bool.isRequired
    };

    state = {
      // 控制是否可以渲染
      isRender: false
    };

    componentDidMount = () => {
      // const { props } = this;
      // 验证是否登陆
      // if (!props.userInfo.hasOwnProperty('id')) {
      //   props.history.push('/account/signIn');
      // } else {
      //   this.setState({
      //     isRender: true
      //   });
      // }

      this.setState({
        isRender: true
      });
    };

    render() {
      const { state, props } = this;
      if (state.isRender) {
        return (
          <section className={`layout-master-system-container ${props.systemSidebarIsCollapse ? 'collapse' : ''}`}>
            <section className="main-container">
              {/* 侧边菜单栏 */}
              <LayoutSystemSidebar />
              <section className="content-container">
                {/* 操作栏 */}
                <LayoutSystemHeader routeMatchList={matchRoutes(props.route.routes, props.location.pathname)} />
                <TransitionGroup>
                  <CSSTransition
                    key={props.location.pathname}
                    classNames="system-slide-left"
                    timeout={200}
                  >
                    <section className="main-content-container">
                      {renderRoutes(props.route.routes)}
                    </section>
                  </CSSTransition>
                </TransitionGroup>
              </section>
            </section>
          </section>
        );
      } else {
        return <section>加载中!</section>;
      }
    }
  }
);
