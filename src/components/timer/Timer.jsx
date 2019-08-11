import React from 'react';
import CSSModules from 'react-css-modules';
import timer from './../../styles/timer.scss';

const Timer = () => <h1 stylename={timer.header}>godzina</h1>;
export default CSSModules(Timer, timer, { allowMultiple: true });
