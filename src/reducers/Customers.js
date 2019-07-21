import {
    TOKEN,
    TOKEN_FAILED,
    LOGOUT,
    REGISTER_FAILED,
    REGISTER_SUCCESSFUL,
    FETCH_CUSTOMER_DETAILS,
    FETCH_CUSTOMER_DETAILS_RECEIVED,
    FETCH_CUSTOMER_DETAILS_FAILED,
    UPDATE_ADDRESS,
    UPDATE_ADDRESS_RECEIVED,
    UPDATE_ADDRESS_FAILED,
    UPDATE_REGION_ADDRESS,
    UPDATE_REGION_ADDRESS_RECEIVED,
    UPDATE_REGION_ADDRESS_FAILED
} from '../actions/types';

const initialState = {
    authenticated: false,
    isLoading: false,
    isAdmin: false,
    registerSuccess: false,
    hasError: false,
    activeCustomer: null,
    message: "Registration failed"
};

export default function CustomerReducer (state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case TOKEN:
            newState = Object.assign({}, state, {authenticated: true, hasError: false});
            return newState;
        case LOGOUT:
            localStorage.removeItem('customerId');
            localStorage.removeItem('token');
            return state;
        case REGISTER_SUCCESSFUL:
            newState = Object.assign({}, state, {registerSuccess: true, hasError: false});
        case FETCH_CUSTOMER_DETAILS_RECEIVED:
            newState = Object.assign({}, state, {activeCustomer: action.response.data, hasError: false});
            return newState;
        case FETCH_CUSTOMER_DETAILS_FAILED:
            newState = Object.assign({}, state, { hasError: true});
            return newState;
        case UPDATE_ADDRESS_RECEIVED:
            newState = Object.assign({}, state, {activeCustomer: action.response.data, hasError: false});
            return newState;

        case UPDATE_REGION_ADDRESS_RECEIVED:
            newState = Object.assign({}, state, {activeCustomer: action.response.data, hasError: false});
            return newState;

        case TOKEN_FAILED:
        case UPDATE_REGION_ADDRESS_FAILED:
            newState = Object.assign({}, state, { hasError: true});
            return newState;
        case UPDATE_ADDRESS_FAILED:
            newState = Object.assign({}, state, { hasError: true});
            return newState;
        case REGISTER_FAILED:
            newState = Object.assign({}, state, {registerSuccess: false, hasError: true});
            return newState;
        default:
            return state;
    }
}
