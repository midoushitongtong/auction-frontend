import React from 'react';
import Head from 'next/head';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  updateCurrentAccountPersonCollectionFavoriteSearchCondition,
  updateAccountPersonCollectionFavoriteSearchResult
} from '../../../../store/account/person';
import AccountPerson from '../../../../component/account/person';
import LayoutHeader from '../../../../component/layout/header';
import LayoutFooter from '../../../../component/layout/footer';
import AccountPersonCollectionFavoriteSearchResult from '../../../../component/account/person/collection-favorite-search-result';
import api from '../../../../api';
import './index.scss';

// 当前组件的类型声明
interface ConnectState {
}

interface ConnectDispatch {
  // 修改当前我的收藏品的搜索条件
  updateCurrentAccountPersonCollectionFavoriteSearchCondition: any;
  // 修改我的收藏品搜索的结果集
  updateAccountPersonCollectionFavoriteSearchResult: any;
}

interface Props {

}

interface State {

}

// 当前组件类
export default compose<React.Component>(
  connect<ConnectState, ConnectDispatch, Props>(
    () => ({}),
    {
      updateCurrentAccountPersonCollectionFavoriteSearchCondition,
      updateAccountPersonCollectionFavoriteSearchResult
    }
  )
)(
  class AccountPersonCollection extends React.Component<Props, State> {
    public static getInitialProps = async ({ query, store }: any) => {
      // 获取当前公告的搜索条件
      const currentAccountPersonCollectionFavoriteSearchCondition = {
        current: query.current || 1,
        pageSize: query.pageSize || 10
      };
      store.dispatch(updateCurrentAccountPersonCollectionFavoriteSearchCondition(currentAccountPersonCollectionFavoriteSearchCondition));

      // 获取公告的搜索结果集
      let accountPersonCollectionFavoriteSearchResult: any = [];
      const result: any = await api.accountPerson.selectAccountPersonCollectionFavoriteList(currentAccountPersonCollectionFavoriteSearchCondition);
      if (result.code === '0') {
        accountPersonCollectionFavoriteSearchResult = result.data;
        store.dispatch(updateAccountPersonCollectionFavoriteSearchResult(accountPersonCollectionFavoriteSearchResult));
      }
      return {};
    };

    public render = (): JSX.Element => {
      return (
        <section className="app-container">
          <Head>
            <title>我的收藏 - 个人中心 - 新创文化艺术品</title>
          </Head>
          <LayoutHeader
            hiddenHeaderTop={true}
            hiddenHeaderNav={true}
          />
          <section className="account-person-collection-favorite-container">
            <section className="account-person-collection-favorite-wrapper-container">
              <section className="account-person-collection-favorite-wrapper-inner-container">
                <AccountPerson>
                  <AccountPersonCollectionFavoriteSearchResult/>
                </AccountPerson>
              </section>
            </section>
          </section>
          <LayoutFooter/>
        </section>
      );
    }
  }
);
