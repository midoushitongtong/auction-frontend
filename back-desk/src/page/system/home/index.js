import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  class SystemHome extends React.Component {
    render() {
      const { props } = this;
      return (
        <section className="home-container">
          {renderRoutes(props.route.routes)}
        </section>
      );
    }
  }
);
