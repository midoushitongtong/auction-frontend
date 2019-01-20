import React from 'react';
import { renderRoutes } from 'react-router-config';

export default class LayoutMasterSystemUserPerson extends React.Component {
  state = {};

  render = () => {
    const { props } = this;
    return (
      <section className="system-user-person-container">
        {renderRoutes(props.route.routes)}
      </section>
    );
  }
};
