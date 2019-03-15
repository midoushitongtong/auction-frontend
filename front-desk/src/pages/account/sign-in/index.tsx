import React from 'react';
import Head from 'next/head';
import Header from '../../../component/_layout/header';
import Footer from '../../../component/_layout/footer';
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
        <Header/>
        <section className="account-sign-up-container">
          <section className="account-sign-up-wrapper-container">
            <section className="account-sign-up-wrapper-inner-container">
              <AccountSignInDetail/>
            </section>
          </section>
        </section>
        <Footer/>
      </section>
    );
  }
}
