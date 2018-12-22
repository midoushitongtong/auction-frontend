import React from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

export default withRouter(connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  class SystemHomeWelcome extends React.Component {
    state = {};

    render() {
      return (
        <section className="home-welcome-container">
          空空如也~
        </section>
      );
    }
  }
));
