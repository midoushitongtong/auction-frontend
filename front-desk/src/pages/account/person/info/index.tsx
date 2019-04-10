import React from 'react';
import Head from 'next/head';
import AccountPerson from '../../../../component/account/person';
import LayoutHeader from '../../../../component/layout/header';
import LayoutFooter from '../../../../component/layout/footer';
import AccountPersonInfoSearchDetail from '../../../../component/account/person/info-search-detail';
import './index.scss';
import { AppState } from "../../../../store";
import { compose } from 'redux';
import { connect } from 'react-redux';

// 当前组件的类型声明
interface ConnectState {
  siteInfo: any;
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
      siteInfo: state.site.siteInfo
    }),
    {}
  )
)(
  class AccountPersonCollection extends React.Component<Props, State> {
    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="app-container">
          <LayoutHeader
            hiddenHeaderTop={true}
            hiddenHeaderNav={true}
          />
          <Head>
            <title>个人信息 - 个人中心 - {props.siteInfo.title}</title>
          </Head>
          <section className="account-person-info-container">
            <section className="account-person-info-wrapper-container">
              <section className="account-person-info-wrapper-inner-container">
                <AccountPerson>
                  <AccountPersonInfoSearchDetail/>
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
