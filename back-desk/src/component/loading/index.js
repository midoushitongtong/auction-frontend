import React from 'react';

export default class Loading extends React.Component {
  state = {};

  static getDerivedStateFromProps() {
    return null;
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <section className="loading-container">
        loading...
      </section>
    );
  }
}
