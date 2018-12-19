import React from 'react';
import { connect } from 'react-redux';
import { Swiper, Navigation, Pagination, Autoplay, Lazy } from 'swiper/dist/js/swiper.esm.js';
import 'swiper/dist/css/swiper.min.css';
import './index.scss';
// install model
Swiper.use([Navigation, Pagination, Autoplay, Lazy]);

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  class HomeCarousel extends React.Component {
    state = {
      carouselList: [
        {
          imagePath: require('../../../assets/images/banner01.png')
        },
        {
          imagePath: require('../../../assets/images/banner02.png')
        }
      ]
    };

    componentDidMount = () => {
      new Swiper('.swiper-container', {
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
    };

    render() {
      const { state } = this;
      return (
        <section className="home-carousel-container">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {state.carouselList.map((item, index) => (
                <div className="swiper-slide" key={index}>
                  <img alt="" data-src={item.imagePath} className="swiper-lazy"/>
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
);
