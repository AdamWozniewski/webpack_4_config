import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import routes from "./../routes/index";
import ModalRootComponent from './../components/containers/modal/Modal';
import RegistrationForm from './../components/forms/RegistrationForm';
import Timer from "./../components/timer/Timer";
import history from './../store/history';

const {
  home,
  login
} = routes;

const Root = () => (
  <BrowserRouter history={ history }>
    <div>
      <Switch>
        <Route exact path={home} render={() => <Redirect to={ login } />} />
        <Route exact path={login} component={ ModalRootComponent } />
        <Route exact path="/path1" component={ RegistrationForm } />
        <Route exact path="/path2" component={ Timer } />
      </Switch>
      <hr/>

      <Link to="/" >/</Link>
      <br/>
      <Link to="/path1" >Path1</Link>
      <br/>
      <Link to="/path2" >Path2</Link>
    </div>
  </BrowserRouter>
);

export default Root;






