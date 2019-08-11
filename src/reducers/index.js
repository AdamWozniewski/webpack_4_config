import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import modalReducer from './modalReducer';

const rootReducer = combineReducers({
    modalReducer,
    form: formReducer
});

export default rootReducer;
