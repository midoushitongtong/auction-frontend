import React from 'react';
import Head from 'next/head';
import Header from '../../../component/_layout/header';
import Footer from '../../../component/_layout/footer';
import './index.scss';

// 当前组件的类型声明
interface Props {

}

interface State {

}

// 当前组件类
export default class AccountSignIn extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    return (
      <section className="app-container">
        <Head>
          <title>登陆 - 新创文化艺术品</title>
        </Head>
        <Header/>
        <section className="account-sign-in-container">
          <section className="account-sign-in-wrapper-container">
            <section className="account-sign-in-wrapper-inner-container">
              sign in
            </section>
          </section>
        </section>
        <Footer/>
      </section>
    );
  }
}
