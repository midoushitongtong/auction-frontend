import React from 'react';
import { renderRoutes, matchRoutes, RouteConfigComponentProps } from 'react-router-config';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AppState } from '../../../../store';
import { asyncUpdateUserInfo } from '../../../../store/account';
import LayoutSystemSidebar from '../../../../component/_layout/master/system/sidebar';
import LayoutSystemHeader from '../../../../component/_layout/master/system/header';
import './index.scss';

// 当前组件的类型声明
interface ConnectState {
  userInfo: object,
  systemSidebarIsCollapse: boolean
}

interface ConnectDispatch {
  asyncUpdateUserInfo: () => {}
}

interface Props extends ConnectState, ConnectDispatch, RouteConfigComponentProps {
}

interface State {
  isRender: boolean
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      userInfo: state.account.userInfo,
      systemSidebarIsCollapse: state.systemStyle.systemSidebarIsCollapse
    }),
    {
      asyncUpdateUserInfo
    }
  )
)(
  class LayoutMasterSystem extends React.Component<Props, State> {
    public state: State = {
      // 控制是否可以渲染
      isRender: false
    };

    public componentDidMount = (): void => {
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

    public render = (): JSX.Element => {
      const { state, props } = this;

      if (state.isRender && props.route && props.route.routes) {
        return (
          <section className={`layout-master-system-container ${props.systemSidebarIsCollapse ? 'collapse' : ''}`}>
            <section className="main-container">
              {/* 侧边菜单栏 */}
              <LayoutSystemSidebar/>
              <section className="content-container">
                {/* 操作栏 */}
                <LayoutSystemHeader routeMatchList={matchRoutes((props.route as any).routes, props.location.pathname)}/>
                <TransitionGroup>
                  <CSSTransition
                    key={props.location.pathname}
                    classNames="system-slide-left"
                    timeout={200}
                    mountOnEnter={true}
                    unmountOnExit={true}
                  >
                    <section className="main-content-container">
                      <Switch location={props.location}>
                        {renderRoutes(props.route.routes)}
                      </Switch>
                    </section>
                  </CSSTransition>
                </TransitionGroup>
              </section>
            </section>
          </section>
        );
      } else {
        return (
          <section>加载失败, 检查路由配置...</section>
        );
      }
    };
  }
);
