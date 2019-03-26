import React from 'react';
import App, { Container } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';

// ie11 兼容
import "@babel/polyfill";

// react-redux 高阶组件
import { Provider } from 'react-redux';
import { updateUserInfo } from '../store/account';
import { updateNoticeCategory } from '../store/notice';
import { updateSiteInfo } from '../store/site';
import withReduxStore from '../util/with-redux-store'

// 全局 css
import 'normalize.css';
import 'nprogress/nprogress.css';
import './_app.scss';

import Error from './_error';
import api from '../api'

// NProgress 配置
NProgress.configure({
  minimum: .35,
  easing: 'ease-in',
  speed: 233,
  trickle: true,
  trickleSpeed: 65,
  showSpinner: false
});

// 当前组件类型声明
interface Props {
  store: any;
  error: any;
}

// 当前组件类
export default withReduxStore(
  class _app extends App<Props> {
    public static getInitialProps = async ({ Component, ctx }: any) => {
      let pageProps: any = {};
      let error: any = null;
      try {
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx);
        }

        // 初始化用户登陆信息(因为每个页面都可能需要用到)
        // (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
        if (ctx.store.getState().account.userInfo.isGet === undefined) {
          let userInfo: any = {};
          const result: any = await api.account.selectUserInfo();
          if (parseInt(result.code) === 0) {
            userInfo = result.data;
            userInfo.isGet = true;
            ctx.store.dispatch(updateUserInfo(userInfo));
          }
        }

        // 初始化文章分类, 用于显示到菜单上
        // (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
        if (ctx.store.getState().notice.noticeCategory.isGet === undefined) {
          let noticeCategory: any = {};
          const result: any = await api.notice.selectNoticeCategory();
          if (parseInt(result.code) === 0) {
            noticeCategory.itemList = result.data.map((item: any) => ({
              id: item.c_id + '',
              name: item.cate_title,
              children: item.children.length > 0
                ? item.children.map((itemChild: any) => ({
                  id: itemChild.c_id,
                  name: itemChild.cate_title,
                }))
                : []
            }));
            noticeCategory.isGet = true;
            ctx.store.dispatch(updateNoticeCategory(noticeCategory));
          }
        }

        // 初始化网站基本信息
        // (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
        if (ctx.store.getState().site.siteInfo.isGet === undefined) {
          let siteInfo: any = {};
          const result: any = await api.site.getSiteInfo();
          if (parseInt(result.code) === 0) {
            siteInfo = {
              title: result.data[0].value,
              logo: result.data[1].value,
              qrCode: result.data[2].value,
              seoKeyword: result.data[3].value,
              fax: result.data[6].value,
              copyright: result.data[12].value,
              companyName: result.data[4].value,
              contactPhone: result.data[5].value,
              contactEmail: result.data[7].value,
              contactWeixin: result.data[8].value,
              contactAddress: result.data[9].value,
              browserIcon: result.data[10].value,
              miitbeian: result.data[11].value
            };
            siteInfo.isGet = true;
            ctx.store.dispatch(updateSiteInfo(siteInfo));
          }
        }

      } catch (e) {
        error = {
          statusCode: 500,
          detail: e.config
        };
      }
      return {
        pageProps,
        error
      };
    };

    public componentDidMount = (): void => {
      Router.events.on('routeChangeStart', () => NProgress.start());
      Router.events.on('routeChangeComplete', () => NProgress.done());
      Router.events.on('routeChangeError', () => NProgress.done());
    };

    public render = (): JSX.Element => {
      const { props } = this;
      const { Component, pageProps, store, error } = props;
      if (error) {
        return (
          <Error {...error}/>
        );
      } else {
        return (
          <Container>
            <Provider store={store}>
              <Component {...pageProps}/>
            </Provider>
          </Container>
        );
      }
    };
  }
);
