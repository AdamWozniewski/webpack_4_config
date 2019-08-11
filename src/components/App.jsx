import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import ModalRootComponent from './containers/modal/Modal';
import RegistrationForm from './forms/RegistrationForm';
import Timer from "./timer/Timer";

import history from './../store/history';

const App = () => (
    <Router history={history}>
        <Route path="/" exact component={ModalRootComponent} />
        <Route path="/path1" exact component={RegistrationForm} />
        <Route path="/path2" exact component={Timer} />
        <hr/>

        <Link to="/" >/</Link>
        <br/>
        <Link to="/path1" >Path1</Link>
        <br/>
        <Link to="/path2" >Path2</Link>
    </Router>
);

export default App;
