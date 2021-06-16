import * as actionTypes from './actions';

export const initialState = {
    isOpen: 'dashboard', //for active default menu
};

const customizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            return {
                ...state,
                isOpen: action.isOpen,
            };
        default:
            return state;
    }
};

export default customizationReducer;
