import {
    FETCH_TAX,
    FETCH_TAX_FAILED,
    FETCH_TAX_RECEIVED,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_RECEIVED,
    CREATE_ORDER,
    MAKE_PAYMENT_RECEIVED,
    MAKE_PAYMENT,
    MAKE_PAYMENT_FAILED,
    FETCH_ORDER_RECEIVED,
    FETCH_ORDER_FAILED,
    FETCH_ORDER,
    FETCH_ORDERS_RECEIVED,
    FETCH_ORDERS_FAILED,
    FETCH_ORDERS
} from '../actions/types';

const initialState = {
    isLoading: false,
    hasError: false,
    taxes: [],
    orderId: "",
    stripeObject: [],
    paymentSuccess: false,
    orders: [],
    order: {}
};

export default function CustomerReducer (state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_TAX_RECEIVED:
            newState = Object.assign({}, state, { hasError: false, taxes: action.response.data});
            return newState;
        case CREATE_ORDER_RECEIVED:
            newState = Object.assign({}, state, { hasError: false, orderId: action.response.data.orderId});
            return newState;

        case MAKE_PAYMENT_RECEIVED:
            newState = Object.assign({}, state, { hasError: false, paymentSuccess:true, stripeObject: action.response.data});
            return newState;

        case FETCH_ORDER_RECEIVED:
            newState = Object.assign({}, state, { hasError: false, order: action.response.data});
            return newState;

        case FETCH_ORDERS_RECEIVED:
            newState = Object.assign({}, state, { hasError: false, orders: action.response.data});
            return newState;

        case MAKE_PAYMENT_FAILED:
            newState = Object.assign({}, state, { hasError: true, paymentSuccess: "failed"});
            return newState;

        case FETCH_TAX:
        case CREATE_ORDER:
        case MAKE_PAYMENT:
        case FETCH_ORDER:
        case FETCH_ORDERS:
            newState = Object.assign({}, state, { isLoading:  true });
            return state;

        case FETCH_ORDERS_FAILED:
        case FETCH_ORDER_FAILED:
        case CREATE_ORDER_FAILED:
        case FETCH_TAX_FAILED:
            newState = Object.assign({}, state, { hasError: true});
            return newState;
        default:
            return state;
    }
}
