import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import LayoutHeader from '../../component/_layout/header';
import HomeCarousel from '../../component/home/carousel';
import HomeProduct from '../../component/home/product';
import LayoutFooter from '../../component/_layout/footer';

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  class LayoutMaster extends React.Component {
    render() {
      return (
        <section className="home-container">
          {/* 公共头部 */}
          <LayoutHeader/>
          <section className="home-wrapper-container">
            <section className="home-wrapper-inner-container">
              {/* 轮播图 */}
              <HomeCarousel/>
              {/* 精选收藏品组件 */}
              <HomeProduct/>
            </section>
          </section>
          {/* 公共底部 */}
          <LayoutFooter/>
        </section>
      );
    }
  }
);
