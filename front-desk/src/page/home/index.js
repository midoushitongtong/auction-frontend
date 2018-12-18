import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Header from '../../component/header';

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
        </section>
      );
    }
  }
);
