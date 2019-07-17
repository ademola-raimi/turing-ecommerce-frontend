import {
    FETCH_CART_ID,
    SAVE_CART,
    UPDATE_CART,
    FETCH_TOTAL_AMOUNT,
    FETCH_CART_COUNT
} from '../actions/types';

export const fetchCartId = () => ({
    type: FETCH_CART_ID,
});

export const saveCart = (productId, cartId, attributes) => ({
    type: SAVE_CART,
    productId,
    cartId,
    attributes
});

export const updateCart = (productId, cartId, attributes) => ({
    type: UPDATE_CART,
    productId,
    cartId,
    attributes
});

export const totalPrice = () => ({
    type: FETCH_TOTAL_AMOUNT,
});

export const totalCount = () => ({
    type: FETCH_CART_COUNT,
});
