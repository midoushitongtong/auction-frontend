import React from 'react';
import './index.scss';

// 当前组件的类型声明
interface Props {
  carouselList: any[]
}

interface State {

}

// 当前组件类
export default class HomeCarousel extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }


  public componentDidMount = (): void => {
    try {
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
        lazy: true
      });
    } catch (e) {
      console.error('实例化 swiper 失败, 请检查 swiper 资源文件');
    }
    // 触发一次 resize, 让 swiper 重新渲染
    setTimeout(() => {
      const myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    }, 500);
  };

  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="home-carousel-container">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {props.carouselList.map((item: any, index: number) => (
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
