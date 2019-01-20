import React from 'react';
import { renderRoutes } from 'react-router-config';

export default class LayoutMasterSystemProductCollection extends React.Component {
  state = {};

  render = () => {
    const { props } = this;
    return (
      <section className="system-product-collection-container">
        {renderRoutes(props.route.routes)}
      </section>
    );
  }
};
