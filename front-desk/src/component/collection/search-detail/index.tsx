import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ImageZoom from 'react-medium-image-zoom';
import './index.scss'

// 当前组件的类型声明
interface ConnectState {
  // 搜索到的收藏品详情
  collectionSearchDetail: any;
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch {
  // 搜索到的公告详情
  collection: any;
}

interface State {
  // 轮播图当前选中的索引
  currentSwiperIndex: number;
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any) => ({
      collectionSearchDetail: state.collection.collectionSearchDetail
    }),
    {}
  )
)(
  class CollectionSearchDetail extends React.Component<Props, State> {
    public swiperInstance: any = null;

    constructor(props: any) {
      super(props);
      this.state = {
        currentSwiperIndex: 0
      };
    }

    public componentDidMount = (): void => {
      try {
        this.swiperInstance = new (window as any).Swiper('.swiper-container', {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination'
          },
          loop: false,
          lazy: true,
          on: {
            slideChangeTransitionStart: () => {
              if (this.swiperInstance) {
                this.setState({
                  // 更新轮播图当前选中的索引
                  currentSwiperIndex: this.swiperInstance.realIndex
                });
                this.swiperInstance.update(true);
              }
            }
          },
        });
      } catch (e) {
        console.log(e);
        console.error('实例化 swiper 失败, 请检查 swiper 资源文件');
      }
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="collection-search-detail-container">
          <section className="collection-content-container">
            <section className="collection-base-info-container">
              <section className="collection-base-info-item lot">
                <span className="title">lot</span>
                <span className="detail">{props.collectionSearchDetail.lot}</span>
              </section>
              <section className="collection-base-info-item name">
                <span className="title">名称</span>
                <span className="detail">{props.collectionSearchDetail.name}</span>
              </section>
              <section className="collection-base-info-item">
                <span className="title">参考价</span>
                <span className="detail">{props.collectionSearchDetail.price}</span>
              </section>
              {props.collectionSearchDetail.descriptionList.map((description: any, index: number) => {
                const descriptionArr = description.split(':');
                return (
                  <section className="collection-base-info-item" key={index}>
                    <span className="title">{descriptionArr[0]}</span>
                    <span className="detail">{descriptionArr[1]}</span>
                  </section>
                );
              })}
              <section className="collection-base-info-item description">
                <span className="title">描述</span>
                <section
                  className="detail"
                  dangerouslySetInnerHTML={{ __html: props.collectionSearchDetail.description }}
                />
              </section>
            </section>
            <section className="collection-image-container">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {props.collectionSearchDetail.carouselList.map((item: any, index: number) => (
                    <div className="swiper-slide" key={index}>
                      <ImageZoom
                        image={{
                          src: item,
                          alt: item,
                          className: 'swiper-lazy',
                        }}
                        zoomImage={{
                          src: item,
                          alt: item
                        }}
                      />
                      <div className="swiper-lazy-preloader swiper-lazy-preloader-white"/>
                    </div>
                  ))}
                </div>
                <div className="swiper-thumb">
                  {props.collectionSearchDetail.carouselList.map((item: any, index: number) => (
                    <div
                      className={state.currentSwiperIndex === index ? 'swiper-thumb-item active' : 'swiper-thumb-item'}
                      key={index}
                      onClick={() => {
                        if (this.swiperInstance) {
                          // 滑动到指定的轮播图
                          this.swiperInstance.slideTo(index, 300);
                        }
                      }}
                    >
                      <img src={item}/>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </section>
      );
    };
  }
);
