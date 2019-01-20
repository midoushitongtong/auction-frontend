import React from 'react';
import { renderRoutes } from 'react-router-config';

export default class LayoutMasterSystemProduct extends React.Component {
  render = () => {
    const { props } = this;
    return (
      <section className="system-product-container">
        {renderRoutes(props.route.routes)}
      </section>
    );
  }
};
