import ACTIONS from './../static/ACTIONS';

const defaultState = {
    visible: false,
};
export function modalReducer (state = defaultState, action) {
    const { type, payload } = action;
    switch (type) {
        default:
            return state;
    }
}

export default modalReducer;