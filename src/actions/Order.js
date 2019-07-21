import {
    FETCH_TAX,
    CREATE_ORDER,
    MAKE_PAYMENT,
    FETCH_ORDER,
    FETCH_ORDERS
} from '../actions/types';

export const fetchTax = () => ({
    type: FETCH_TAX,
});

export const createOrder = (shippingId, taxId) => ({
    type: CREATE_ORDER,
    shippingId,
    taxId
});

export const makePayment = (payload) => ({
    type: MAKE_PAYMENT,
    payload
});

export const fetchOrders = () => ({
    type: FETCH_ORDERS,
});

export const fetchOrder = (orderId) => ({
    type: FETCH_ORDER,
    orderId
});

