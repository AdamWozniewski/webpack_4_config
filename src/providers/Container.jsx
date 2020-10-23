import React, { Component } from 'react';

class Container extends Component {
  state = {};
  render () {
    const renderProps = {};
    return this.props.render(renderProps);
  }
}

export default Container;
