import React from 'react';
import { connect } from 'react-redux';
import './index.scss'

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
          <section className="collection-wrapper-container">
            <section className="collection-wrapper-inner-container">
             <h1>收藏品列表页</h1>
            </section>
          </section>
        </section>
      );
    };
  }
);
