import React from 'react';
import App, { Container } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
// react-redux 高阶组件
import { Provider } from 'react-redux';
import withReduxStore from '../util/with-redux-store'
// ie11 兼容
import "@babel/polyfill";
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
      let pageProps = {};
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
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
