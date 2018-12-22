import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from './router';
import { asyncUpdateUserInfo } from './store/account';
import './App.scss';
import 'nprogress/nprogress.css';

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {
    asyncUpdateUserInfo
  }
)(
  class App extends Component {
    state = {
      isRender: false
    };

    componentDidMount = async () => {
      // const { props } = this;
      // 更新当前用户登陆状态
      // await props.asyncUpdateUserInfo();
      this.setState({
        isRender: true
      });
    };

    render() {
      const { state } = this;
      if (state.isRender) {
        return (
          <main className='app-container'>
            <Router/>
          </main>
        );
      } else {
        return <section>加载中!</section>;
      }
    }
  }
);
