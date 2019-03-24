import React from 'react';
import Head from 'next/head';
import LayoutHeader from '../../component/layout/header';
import LayoutFooter from '../../component/layout/footer';
import HomeCarousel from '../../component/home/carousel';
import HomeCollectionList from '../../component/home/collection-list';
import api from '../../api';
import './index.scss';

// 当前组件的类型声明
interface Props {
  // 热门收藏品列表
  collectionHotList: any;
}

interface State {
}

// 当前组件类
export default class Home extends React.Component<Props, State> {
  public static getInitialProps = async () => {
    // 获取热门收藏品列表
    let collectionHotList = [];
    const result: any = await api.collection.selectCollectionFavoriteList();
    if (result.code === '0') {
      collectionHotList = result.data;
    }
    return {
      collectionHotList
    };
  };

  public componentDidMount = async () => {
    setTimeout(() => {
      if (window.scrollY === 0) {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      }
    }, 500);
  };

  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="app-container">
        <Head>
          <title>首页 - 新创文化艺术品</title>
        </Head>
        <LayoutHeader/>
        <section className="home-container">
          <section className="home-wrapper-container">
            <section className="home-wrapper-inner-container">
              {/*轮播图*/}
              <HomeCarousel/>
              {/*精选收藏品组件*/}
              <HomeCollectionList
                collectionHotList={props.collectionHotList}
              />
            </section>
          </section>
        </section>
        <LayoutFooter/>
      </section>
    );
  };
}
