import React from 'react';
import { connect } from 'react-redux';
import Header from '../../component/_layout/header';
import './index.scss'
import LayoutFooter from "../../component/_layout/footer";

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  class Collection extends React.Component {
    render() {
      return (
        <section className="collection-container">
          {/* 公共头部 */}
          <Header/>
          <section className="collection-wrapper-container">
            <section className="collection-wrapper-inner-container">
             <h1>收藏品列表页</h1>
            </section>
          </section>
          {/* 公共底部 */}
          <LayoutFooter/>
        </section>
      );
    };
  }
);
