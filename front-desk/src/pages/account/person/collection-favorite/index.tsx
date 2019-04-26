import React from 'react';
import Head from 'next/head';
import { Spin } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../store';
import AccountPerson from '../../../../component/account/person';
import LayoutHeader from '../../../../component/layout/header';
import LayoutFooter from '../../../../component/layout/footer';
import AccountPersonCollectionFavoriteSearchResult
  from '../../../../component/account/person/collection-favorite-search-result';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  siteInfo: any;
  userInfo: any;
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      siteInfo: state.site.siteInfo,
      userInfo: state.account.userInfo
    }),
    {}
  )
)(
  class AccountPersonCollection extends React.Component<Props, State> {
    public static getInitialProps = async ({ query }: any) => {
      return {
        // 返回 query 用户监听路由发送变化
        query
      };
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="app-container">
          <LayoutHeader
            hiddenHeaderTop={true}
            hiddenHeaderNav={true}
          />
          <Head>
            <title>我的收藏 - 个人中心 - {props.siteInfo.title}</title>
          </Head>
          {props.userInfo.username
            ? (
              <section className="account-person-collection-favorite-container">
                <section className="account-person-collection-favorite-wrapper-container">
                  <section className="account-person-collection-favorite-wrapper-inner-container">
                    <AccountPerson>
                      <AccountPersonCollectionFavoriteSearchResult/>
                    </AccountPerson>
                  </section>
                </section>
              </section>
            )
            : (
              <section className="loading-container">
                <Spin/>
              </section>
            )}
          <LayoutFooter/>
        </section>
      );
    }
  }
);
