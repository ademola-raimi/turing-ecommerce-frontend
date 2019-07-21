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
    FECTH_CART_COUNT_FAILED,
    FETCH_ALL_CARTS,
    FETCH_ALL_CARTS_RECEIVED,
    FETCH_ALL_CARTS_FAILED,
    EMPTY_CARTS,
    EMPTY_CARTS_RECEIVED,
    EMPTY_CARTS_FAILED,
    REMOVE_PRODUCT,
    REMOVE_PRODUCT_RECEIVED,
    REMOVE_PRODUCT_FAILED
} from '../actions/types';

import _ from 'lodash';

const initialState = {
    hasError: false,
    isLoading: true,
    status: null,
    cartId: '',
    totalAmount: 0,
    totalCartItem: 0,
    allCarts: [],
    isBasketEmpty: false,
    removeProduct: false
  }

export default function categoryReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_CART_ID_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false, cartId: action.response.data.cart_id });
            return newState;

        case SAVE_CART_RECIEVED:
            localStorage.setItem("cartsInfo", JSON.stringify(action.response.data));
            newState = Object.assign({}, state, { isLoading: false} );
            return newState;

        case TOTAL_AMOUNT_RECIEVED:

            newState = Object.assign({}, state, { isLoading: false, totalAmount: action.response.data.total_amount.toFixed(2) });
            return newState;

        case FETCH_CART_COUNT_RECIEVED:

            newState = Object.assign({}, state, { isLoading: false, totalCartItem: action.response.data.total_count });
            return newState;

        case FETCH_ALL_CARTS_RECEIVED:
            console.log('all carts: ',action.response.data)
            const isBasketEmpty = action.response.data.length > 0 ? false : true;
            newState = Object.assign({}, state, { isLoading: false, allCarts: action.response.data, isBasketEmpty: isBasketEmpty, removeProduct: false});
            return newState;

        case EMPTY_CARTS_RECEIVED:
            console.log('empty cart received: ',action.response.data)
            newState = Object.assign({}, state, { isLoading: false, allCarts: [], isBasketEmpty: true, totalCartItem: 0, totalAmount: 0});
            return newState;

        case REMOVE_PRODUCT_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false, removeProduct: true });
            return newState;

        case FETCH_ALL_CARTS_FAILED:
            // console.log('git here: ',action.response.data)
            newState = Object.assign({}, state, { isLoading: false, isBasketEmpty: true});
            return newState;

        case REMOVE_PRODUCT:
        case EMPTY_CARTS:
        case FETCH_ALL_CARTS:
        case FETCH_CART_COUNT:
        case SAVE_CART:
        case FETCH_TOTAL_AMOUNT:
        case FETCH_CART_ID:
            return state;

        case REMOVE_PRODUCT_FAILED:
        case EMPTY_CARTS_FAILED:
        case FETCH_ALL_CARTS_FAILED:
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
