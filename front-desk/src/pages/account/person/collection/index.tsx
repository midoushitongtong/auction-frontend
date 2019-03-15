import React from 'react';
import Head from 'next/head';
import AccountPerson from '../../../../component/account/person';
import LayoutHeader from '../../../../component/layout/header';
import LayoutFooter from '../../../../component/layout/footer';
import AccountPersonCollectionDetail from '../../../../component/account/person/collection-detail';
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
          <title>我的收藏 - 个人中心 - 新创文化艺术品</title>
        </Head>
        <LayoutHeader
          hiddenHeaderTop={true}
          hiddenHeaderNav={true}
        />
        <section className="account-person-collection-container">
          <section className="account-person-collection-wrapper-container">
            <section className="account-person-collection-wrapper-inner-container">
              <AccountPerson>
                <AccountPersonCollectionDetail/>
              </AccountPerson>
            </section>
          </section>
        </section>
        <LayoutFooter/>
      </section>
    );
  }
}
