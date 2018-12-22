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
  class SystemProductCollection extends React.Component {
    state = {};

    render() {
      const { props } = this;
      return (
        <section className="system-product-collection-container">
          {renderRoutes(props.route.routes)}
        </section>
      );
    }
  }
);
