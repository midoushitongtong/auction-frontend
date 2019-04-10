import React from 'react';
import Head from 'next/head';
import LayoutHeader from '../../../component/layout/header';
import LayoutFooter from '../../../component/layout/footer';
import AccountSignInDetail from '../../../component/account/sign-in-detail';
import './index.scss';

// 当前组件的类型声明
interface Props {

}

interface State {

}

// 当前组件类
export default class AccountSignUp extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    return (
      <section className="app-container">
        <Head>
          <title>登陆 - 新创文化艺术品</title>
        </Head>
        <LayoutHeader/>
        <section className="account-sign-in-container">
          <section className="account-sign-in-wrapper-container">
            <section className="account-sign-in-wrapper-inner-container">
              <AccountSignInDetail/>
            </section>
          </section>
        </section>
        <LayoutFooter/>
      </section>
    );
  }
}
