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
  class LayoutMaster extends React.Component {
    render() {
      const { props } = this;
      return (
        <section className="layout-master-container">
          {/* 所有路由组件的入口 */}
          {renderRoutes(props.route.routes)}
        </section>
      );
    }
  }
);
