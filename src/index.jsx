import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Root from './views/Root';
import store from './store/store';
import './styles/style.scss';

const render = (Comp = {}) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Comp />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./views/Root', () => {
    render(Root);
  });
}
