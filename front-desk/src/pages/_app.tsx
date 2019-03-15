import React from 'react';
import App, { Container } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
// ie11 兼容
import "@babel/polyfill";
// react-redux 高阶组件
import { Provider } from 'react-redux';
import withReduxStore from '../util/with-redux-store'
import { updateUserInfo } from '../store/account';
import api from '../api';
// 全局 css
import 'normalize.css';
import 'nprogress/nprogress.css';
import './_app.scss';

// 当前组件类型声明
interface Props {
  store: any;
}

// 当前组件类
export default withReduxStore(
  class _app extends App<Props> {
    public static getInitialProps = async ({ Component, ctx }: any) => {
      let pageProps: any = {};
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      // 在此初始化用户登陆信息(因为每个页面都可能需要用到)
      const result: any = await api.account.selectUserInfo();
      if (result.code === '0') {
        ctx.store.dispatch(updateUserInfo(result.data));
      }

      return {
        pageProps
      };
    };

    public componentDidMount = (): void => {
      Router.events.on('routeChangeStart', () => NProgress.start());
      Router.events.on('routeChangeComplete', () => NProgress.done());
      Router.events.on('routeChangeError', () => NProgress.done());
    };

    public render = (): JSX.Element => {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <Provider store={store}>
            <Component {...pageProps}/>
          </Provider>
        </Container>
      );
    };
  }
);
