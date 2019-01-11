import React from 'react';
import { connect } from 'react-redux';
import Router from './router';
import { asyncUpdateUserInfo } from './store/account';
import './App.scss';

// 当前组件类的 ts 类型声明
interface Props {
}

interface State {
  isRender: boolean
}

// 当前组件类
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
  class App extends React.Component<Props, State> {
    public state = {
      isRender: false
    };

    public componentDidMount = (): void => {
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
)
