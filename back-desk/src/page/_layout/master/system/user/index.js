import React from 'react';
import { renderRoutes } from 'react-router-config';

export default class LayoutMasterSystemUser extends React.Component {
  render = () => {
    const { props } = this;
    return (
      <section className="system-user-container">
        {renderRoutes(props.route.routes)}
      </section>
    );
  }
};
