import React from 'react';
import Head from 'next/head';
import LayoutHeader from '../../component/layout/header';
import LayoutFooter from '../../component/layout/footer';
import HomeCarousel from '../../component/home/carousel';
import HomeCollectionList from '../../component/home/collection-list';
// import { asyncUpdateUserInfo } from '../../store/account';
import './index.scss';

// 当前组件的类型声明
interface Props {
}

interface State {
}

// 当前组件类
export default class Home extends React.Component<Props, State> {
  // public static getInitialProps = async ({ store }: any) => {
  //   store.dispatch(asyncUpdateUserInfo());
  // };

  public render = (): JSX.Element => {
    return (
      <section className="app-container">
        <Head>
          <title>首页 - 新创文化艺术品</title>
        </Head>
        <LayoutHeader/>
        <section className="home-container">
          <section className="home-wrapper-container">
            <section className="home-wrapper-inner-container">
              {/* 轮播图 */}
              <HomeCarousel/>
              {/* 精选收藏品组件 */}
              <HomeCollectionList/>
            </section>
          </section>
        </section>
        <LayoutFooter/>
      </section>
    );
  };
}
