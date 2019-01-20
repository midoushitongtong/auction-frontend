import React from 'react';
import App, { Container } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';

// 全局 css
import 'normalize.css';
import 'nprogress/nprogress.css';
import './_app.scss';

// 当前组件类
export default class _app extends App {
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
    Router.events.on('routeChangeStart', (url: any) => {
      console.log(`Loading: ${url}`);
      NProgress.start()
    });
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  };

  public render = (): JSX.Element => {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps}/>
      </Container>
    );
  };
}
