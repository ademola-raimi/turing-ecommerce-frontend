import {
    FETCH_CART_ID,
    SAVE_CART,
    UPDATE_CART,
    FETCH_TOTAL_AMOUNT,
    FETCH_CART_COUNT,
    FETCH_ALL_CARTS,
    EMPTY_CARTS,
    REMOVE_PRODUCT,
    UPDATE_QUANTITY
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

export const updateQuantity = (itemId, quantityInput) => ({
    type: UPDATE_QUANTITY,
    itemId,
    quantityInput
});

export const totalPrice = () => ({
    type: FETCH_TOTAL_AMOUNT,
});

export const totalCount = () => ({
    type: FETCH_CART_COUNT,
});

export const allCarts = () => ({
    type: FETCH_ALL_CARTS,
});

export const emptyCart = () => ({
    type: EMPTY_CARTS,
});

export const removeProduct = (itemId) => ({
    type: REMOVE_PRODUCT,
    itemId
});

