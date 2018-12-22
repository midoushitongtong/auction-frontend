import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import './index.scss';

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  class LayoutMasterAccount extends React.Component {
    render() {
      const { props } = this;
      return (
        <section className="layout-master-account-container">
          {renderRoutes(props.route.routes)}
        </section>
      );
    }
  }
);
