import React from 'react';
import App, { Container } from 'next/app';
import { withRouter, WithRouterProps } from 'next/router';
import { notification } from 'antd';
import NProgress from 'nprogress';
import Router from 'next/router';

// ie11 兼容
import '@babel/polyfill';

// react-redux 高阶组件
import { Provider } from 'react-redux';
import { updateUserInfo } from '../store/account';
import { updateCollectionFavoriteIdList } from '../store/account/person';
import { updateNoticeCategory } from '../store/notice';
import { updateSiteInfo } from '../store/site';
import withReduxStore from '../util/with-redux-store';

// 全局 css
import 'normalize.css';
import 'nprogress/nprogress.css';
import './_app.less';

import Error from './_error';
import api from '../api';

// NProgress 配置
NProgress.configure({
  minimum: 0.35,
  easing: 'ease-in',
  speed: 233,
  trickle: true,
  trickleSpeed: 65,
  showSpinner: false
});

// 当前组件类型声明
interface Props extends WithRouterProps {
  store: any;
  error: any;
}

// 当前组件类
export default withRouter(
  withReduxStore(
    class _app extends App<Props> {
      public static getInitialProps = async ({ Component, ctx }: any) => {
        let pageProps: any = {};
        let error: any = null;
        try {
          if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
          }

          // 请求 api =======================
          // 初始化文章分类, 用于显示到菜单上 (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
          let result1: any = null;
          if (ctx.store.getState().notice.noticeCategory.isGet === undefined) {
            result1 = api.notice.selectNoticeCategory();
          }

          // 初始化网站基本信息 (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
          let result2: any = null;
          if (ctx.store.getState().site.siteInfo.isGet === undefined) {
            result2 = api.site.getSiteInfo();
          }

          // 等待 api 响应完成 =======================
          if (ctx.store.getState().notice.noticeCategory.isGet === undefined) {
            result1 = await result1;
          }
          if (ctx.store.getState().site.siteInfo.isGet === undefined) {
            result2 = await result2;
          }

          // 处理 api 响应数据 =======================
          // 初始化文章分类, 用于显示到菜单上 (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
          if (ctx.store.getState().notice.noticeCategory.isGet === undefined) {
            let noticeCategory: any = {};
            if (parseInt(result1.code) === 0) {
              noticeCategory.itemList = result1.data.map((item: any) => ({
                id: item.c_id + '',
                name: item.cate_title,
                children: item.children.length > 0
                  ? item.children.map((itemChild: any) => ({
                    id: itemChild.c_id,
                    name: itemChild.cate_title
                  }))
                  : []
              }));
              noticeCategory.isGet = true;
              ctx.store.dispatch(updateNoticeCategory(noticeCategory));
            }
          }

          // 初始化网站基本信息 (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
          if (ctx.store.getState().site.siteInfo.isGet === undefined) {
            let siteInfo: any = {};
            if (parseInt(result2.code) === 0) {
              siteInfo = {
                title: result2.data[0].value,
                logo: result2.data[1].value,
                qrCode: result2.data[2].value,
                seoKeyword: result2.data[3].value,
                fax: result2.data[6].value,
                copyright: result2.data[12].value,
                companyName: result2.data[4].value,
                contactPhone: result2.data[5].value,
                contactEmail: result2.data[7].value,
                contactWeixin: result2.data[8].value,
                contactAddress: result2.data[9].value,
                browserIcon: result2.data[10].value,
                miitbeian: result2.data[11].value
              };
              siteInfo.isGet = true;
              ctx.store.dispatch(updateSiteInfo(siteInfo));
            }
          }
        } catch (e) {
          console.log(e);
          // 处理全部 page 的 getInitialProps 方法抛出的异常
          switch (e.toString()) {
            case 'Error: 404':
              error = {
                statusCode: 404,
                detail: '检查 url 参数是否有误'
              };
              break;
            default:
              error = {
                statusCode: 500,
                detail: e.toString()
              };
          }
        }

        return {
          pageProps,
          error,
          store: ctx.store
        };
      };

      public componentDidMount = async () => {
        const { props } = this;

        // 初始化用户登陆信息(因为每个页面都可能需要用到) (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
        if (props.store.getState().account.userInfo.isGet === undefined) {
          let result1: any = await api.account.selectUserInfo();
          let userInfo: any = {};
          if (parseInt(result1.code) === 0) {
            userInfo = {
              username: result1.data.username,
              email: result1.data.mail,
              phoneNumber: result1.data.phone
            };
          }
          userInfo.isGet = true;
          // 保存登陆状态到 redux
          props.store.dispatch(updateUserInfo(userInfo));
        }

        // 判断此页面是否需要登陆才能访问
        props.router.asPath && this.checkSignIn(props.router.asPath);

        // 监听路由显示顶部加载条
        Router.events.on('routeChangeStart', (url: string) => {
          NProgress.start();
          // 判断页面是否需要登陆才能访问
          this.checkSignIn(url);
        });
        Router.events.on('routeChangeComplete', () => NProgress.done());
        Router.events.on('routeChangeError', () => NProgress.done());

        // 如果已登录初始化用户数据[我收藏的收藏品id等]
        if (props.store.getState().account.userInfo.username) {
          this.initSignInUserData();
        }
      };

      /**
       * 验证路由是否需要登陆
       *
       * @param url 当前的url地址
       */
      public checkSignIn = (url: string): void => {
        const { props } = this;
        if (url.indexOf('/account/person') > -1) {
          if (!props.store.getState().account.userInfo.username) {
            // 提示请先登陆
            notification.open({
              placement: 'bottomLeft',
              message: '登陆信息已失效, 请重新登陆!',
              duration: 5
            });
            setTimeout(() => {
              Router.replace('/account/sign-in');
            }, 1111);
          }
        }
      };

      /**
       * 初始化已登录的用户数据
       *
       */
      public initSignInUserData = async () => {
        const { props } = this;
        // 初始化我收藏的收藏品
        const result1: any = await api.accountPerson.selectCollectionFavoriteIdList();
        if (parseInt(result1.code) === 0) {
          props.store.dispatch(updateCollectionFavoriteIdList(result1.data));
        }
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
  )
);
