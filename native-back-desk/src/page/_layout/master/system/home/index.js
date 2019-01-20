import React from 'react';
import { renderRoutes } from 'react-router-config';

export default class LayoutMasterSystemHome extends React.Component {
  render = () => {
    const { props } = this;
    return (
      <section className="home-container">
        {renderRoutes(props.route.routes)}
      </section>
    );
  }
};
