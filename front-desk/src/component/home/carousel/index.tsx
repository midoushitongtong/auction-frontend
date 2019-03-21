import React from 'react';
import './index.scss';

// 当前组件的类型声明
interface Props {
}

interface State {
  carouselList: {
    imagePath: string
  }[];
}

// 当前组件类
export default class HomeCarousel extends React.Component<Props, State> {
  public state: State = {
    carouselList: [
      {
        imagePath: 'https://yyccyy-01.oss-cn-shenzhen.aliyuncs.com/collection/banner/banner01.png'
      },
      {
        imagePath: 'https://yyccyy-01.oss-cn-shenzhen.aliyuncs.com/collection/banner/banner02.png'
      }
    ]
  };

  public componentDidMount = (): void => {
    new (window as any).Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination'
      },
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      preloadImages: false,
      lazy: true,
      observer: true,
      observeParents: false
    });
    // 触发一次 resize, 让 swiper 重新渲染
    setTimeout(() => {
      const myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    }, 1000);
  };

  public render = (): JSX.Element => {
    const { state } = this;
    return (
      <section className="home-carousel-container">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {state.carouselList.map((item, index) => (
              <div className="swiper-slide" key={index}>
                <img data-src={item.imagePath} className="swiper-lazy"/>
                <div className="swiper-lazy-preloader swiper-lazy-preloader-white"/>
              </div>
            ))}
          </div>
          <div className="swiper-button-next"/>
          <div className="swiper-button-prev"/>
          <div className="swiper-pagination"/>
        </div>
      </section>
    );
  };
}
