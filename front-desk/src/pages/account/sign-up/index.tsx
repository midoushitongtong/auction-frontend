import React from 'react';
import Head from 'next/head';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import LayoutHeader from '../../../component/layout/header';
import LayoutFooter from '../../../component/layout/footer';
import AccountSignUpDetail from '../../../component/account/sign-up-detail';
import './index.scss';

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
  class AccountSignUp extends React.Component<Props, State> {
    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="app-container">
          <LayoutHeader/>
          <Head>
            <title>注册 - {props.siteInfo.title}</title>
          </Head>
          <section className="account-sign-up-container">
            <section className="account-sign-up-wrapper-container">
              <section className="account-sign-up-wrapper-inner-container">
                <AccountSignUpDetail/>
              </section>
            </section>
          </section>
          <LayoutFooter/>
        </section>
      );
    }
  }
);
