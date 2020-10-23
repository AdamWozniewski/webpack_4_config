import React, { Component } from 'react';

const withContainer = WrappedComponent => {
  return class WithContainer extends Component {
    state = {};
    render () {
      return <WrappedComponent property={this.state} wrappedValue {...props} />
    }
  }
};
export default withContainer;
