import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Header from '../../component/_layout/header';
import HomeCarousel from '../../component/home/carousel';

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
          <Header/>
          <section className="home-wrapper-container">
            <section className="home-wrapper-inner-container">
              {/* 轮播图 */}
              <HomeCarousel/>
            </section>
          </section>
        </section>
      );
    }
  }
);
