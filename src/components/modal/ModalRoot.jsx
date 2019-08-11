import React from 'react';
import CSSModules from 'react-css-modules';

import modal_style from './../../styles/modal/modal_styles.scss';
import messages from './../../static/messages.json';

const { modal } = messages;

export const ModalRoot = props => (
    <div className={modal_style.header}>
        <h1>{modal.welcome}</h1>
    </div>
);

export default CSSModules(ModalRoot, modal_style);
