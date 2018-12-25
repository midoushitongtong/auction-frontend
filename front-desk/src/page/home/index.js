import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import HomeCarousel from '../../component/home/carousel';
import HomeProduct from '../../component/home/product';

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  class Home extends React.Component {
    render() {
      return (
        <section className="home-container">
          <section className="home-wrapper-container">
            <section className="home-wrapper-inner-container">
              {/* 轮播图 */}
              <HomeCarousel/>
              {/* 精选收藏品组件 */}
              <HomeProduct/>
            </section>
          </section>
        </section>
      );
    }
  }
);
