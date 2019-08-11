import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import store from "./store/store";
import './styles/style.scss';

const render = (Comp) => {
  ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
          <Comp />
        </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )
};

render(App);

if(module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  })
}

