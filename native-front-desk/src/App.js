import React from 'react';
import { connect } from 'react-redux';
import Router from './router';
import { asyncUpdateUserInfo } from './store/account';
import './App.scss';

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
  class App extends React.Component {
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
          <section className='app-container'>
            <Router/>
          </section>
        );
      } else {
        return <section>加载中!</section>;
      }
    }
  }
);
