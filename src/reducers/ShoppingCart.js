import {
    FETCH_CART_ID,
    FETCH_CART_ID_RECEIVED,
    FETCH_CART_ID_FAILED,
    SAVE_CART,
    SAVE_CART_RECIEVED,
    SAVE_CART_FAILED,
    TOTAL_AMOUNT_RECIEVED,
    FETCH_TOTAL_AMOUNT,
    TOTAL_AMOUNT_FAILED,
    FETCH_CART_COUNT,
    FETCH_CART_COUNT_RECIEVED,
    FECTH_CART_COUNT_FAILED
} from '../actions/types';

import _ from 'lodash';

const initialState = {
    hasError: false,
    isLoading: true,
    status: null,
    cartId: '',
    totalAmount: 0,
    totalCartItem: 0,
  }

export default function categoryReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_CART_ID_RECEIVED:
            console.log('cart_id:',action.response.data.cart_id)
            newState = Object.assign({}, state, { isLoading: false, cartId: action.response.data.cart_id });
            return newState;

        case SAVE_CART_RECIEVED:
        console.log('cart add: ',action.response.data)
            localStorage.setItem("itemId", action.response.data.item_id);
            newState = Object.assign({}, state, { isLoading: false} );
            return newState;

        case TOTAL_AMOUNT_RECIEVED:
            console.log('total cart amt: ',action.response.data.total_amount.toFixed(2))

            newState = Object.assign({}, state, { isLoading: false, totalAmount: action.response.data.total_amount.toFixed(2) });
            return newState;

        case FETCH_CART_COUNT_RECIEVED:
            console.log('total cart count: ',action.response.data.total_count);

            newState = Object.assign({}, state, { isLoading: false, totalCartItem: action.response.data.total_count });
            return newState;

        case FETCH_CART_COUNT:
        case SAVE_CART:
        case FETCH_TOTAL_AMOUNT:
        case FETCH_CART_ID:
            return state;

        case FECTH_CART_COUNT_FAILED:
        case FETCH_CART_ID_FAILED:
        case TOTAL_AMOUNT_FAILED:
        case FETCH_CART_ID_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        default:
            return state;
    }
}
