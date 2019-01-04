import React from 'react';
import { renderRoutes } from 'react-router-config';

export default class LayoutMaster extends React.Component {
  render = () => {
    const { props } = this;
    return (
      <section className="layout-master-container">
        {/* 所有路由的入口 */}
        {renderRoutes(props.route.routes)}
      </section>
    );
  }
};
