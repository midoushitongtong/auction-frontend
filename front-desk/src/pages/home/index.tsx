import React from 'react';
import LayoutHeader from '../../component/layout/header';
import LayoutFooter from '../../component/layout/footer';
import HomeCarousel from '../../component/home/carousel';
import HomeCollectionList from '../../component/home/collection-list';
import api from '../../api';
import './index.scss';

// 当前组件的类型声明
interface Props {
  // 轮播图列表
  carouselList: any;
  // 热门收藏品列表
  collectionHotList: any;
}

interface State {
}

// 当前组件类
export default class Home extends React.Component<Props, State> {
  public static getInitialProps = async () => {
    // 获取轮播图列表
    let carouselList = [];
    let result: any = await api.common.selectCarouselList();

    // 获取热门收藏品列表
    let collectionHotList = [];
    let result2: any = await api.collection.selectCollectionFavoriteList();

    if (parseInt(result.code) === 0) {
      carouselList = result.data.map((item: any) => ({
        imagePath: item
      }));
    }

    if (parseInt(result2.code) === 0) {
      collectionHotList = result2.data;
    }

    return {
      carouselList,
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
        <LayoutHeader/>
        <section className="home-container">
          <section className="home-wrapper-container">
            <section className="home-wrapper-inner-container">
              {/*轮播图*/}
              <HomeCarousel
                carouselList={props.carouselList}
              />
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
