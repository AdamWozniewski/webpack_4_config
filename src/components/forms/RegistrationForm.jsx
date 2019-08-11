import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import messages from './../../static/messages.json';

const { forms } = messages;

class RegistrationForm extends Component {
    submit (vals) {
        console.log(vals)
    }
    render () {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.submit)}>
                    <Field
                        name="login"
                        component="input"
                        type="text"
                        placeholder="Login"
                    /><br/>
                    <Field
                        name="password"
                        component="input"
                        type="password"
                        placeholder="Hasło"
                    /><br/>
                    <button type='submit'>{ forms.save }</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'registrationForm'
})(RegistrationForm);
