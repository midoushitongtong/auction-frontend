import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncUpdateUserInfo } from './store/account';
import Router from './router';
import './App.scss';
import { AppStateType } from "./store";

// 当前组件的类型声明
interface ConnectState {
  userInfo: object
}

interface ConnectDispatch {
  asyncUpdateUserInfo: () => {}
}

interface Props extends ConnectState, ConnectDispatch {

}

interface State {
  isRender: boolean
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppStateType) => ({
      userInfo: state.account.userInfo
    }),
    {
      asyncUpdateUserInfo
    }
  )
)(
  class App extends React.Component<Props, State> {
    public state = {
      isRender: false
    };

    public componentDidMount = async () => {
      // const { props } = this;
      // 更新当前用户登陆状态
      // await props.asyncUpdateUserInfo();
      this.setState({
        isRender: true
      });
    };

    public render = (): React.ReactElement<Props> => {
      const { state } = this;
      if (state.isRender) {
        return (
          <section className='app-container'>
            <Router/>
          </section>
        );
      } else {
        return <section>加载中!</section>;
      }
    };
  }
);
