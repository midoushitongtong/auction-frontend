import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { updateUserInfo } from "../../../../store/account/index";
import LayoutSystemSidebar from "../../../../component/_layout/sidebar/index";
import LayoutSystemHeader from "../../../../component/_layout/system/header/index";

import './index.scss';

export default connect(
  // mapStateToProps
  state => {
    return {
      userInfo: state.account.userInfo
    };
  },
  // mapDispatchToProps
  {
    updateUserInfo
  }
)(
  class LayoutSystem extends React.Component {
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
          <section className="layout-master-system-container">
            <section className="main-container">
              <LayoutSystemSidebar routeLocationPathName={props.history.location.pathname}/>
              <section className="content-container">
                <LayoutSystemHeader routeMatchList={matchRoutes(props.route.routes, props.location.pathname)}/>
                {renderRoutes(props.route.routes)}
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
