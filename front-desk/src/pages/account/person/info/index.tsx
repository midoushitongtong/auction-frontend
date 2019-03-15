import React from 'react';
import Head from 'next/head';
import AccountPerson from '../../../../component/account/person';
import LayoutHeader from '../../../../component/layout/header';
import LayoutFooter from '../../../../component/layout/footer';
import AccountPersonInfoDetail from '../../../../component/account/person/info-detail';
import './index.scss';

// 当前组件的类型声明
interface Props {

}

interface State {

}

// 当前组件类
export default class AccountPersonCollection extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    return (
      <section className="app-container">
        <Head>
          <title>个人信息 - 个人中心 - 新创文化艺术品</title>
        </Head>
        <LayoutHeader
          hiddenHeaderTop={true}
          hiddenHeaderNav={true}
        />
        <section className="account-person-info-container">
          <section className="account-person-info-wrapper-container">
            <section className="account-person-info-wrapper-inner-container">
              <AccountPerson>
                <AccountPersonInfoDetail/>
              </AccountPerson>
            </section>
          </section>
        </section>
        <LayoutFooter/>
      </section>
    );
  }
}
