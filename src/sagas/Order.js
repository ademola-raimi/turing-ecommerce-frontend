import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

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

function* getTax(action) {
    try {
        const response = yield call(fetchTaxApi, action);
        yield put({ type: FETCH_TAX_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_TAX_FAILED, error });
    }
}

function fetchTaxApi(payload) {
    return axios({
        method: "get",
        url: api.api_path + api.version_path + '/tax',
        crossdomain: true
    });
}

function* createOrder(action) {
    try {
        const response = yield call(createOrderApi, action);
        yield put({ type: CREATE_ORDER_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: CREATE_ORDER_FAILED, error });
    }
}

function createOrderApi(payload) {
    let url;
    let newPayload;
    const cartId = localStorage.getItem("cartId");
    url = api.api_path + api.version_path + api.orders_path;

    newPayload = {
        "cart_id": cartId,
        "shipping_id": payload.shippingId,
        "tax_id": payload.taxId,
    }

    return axios.post(url, newPayload);
}

function* makePayment(action) {
    try {
        const response = yield call(makePaymentApi, action);
        yield put({ type: MAKE_PAYMENT_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: MAKE_PAYMENT_FAILED, error });
    }
}

function makePaymentApi(data) {
    let url = api.api_path + api.version_path + '/stripe/charge';

    return axios.post(url, data.payload);
}


function* getOrders(action) {
    try {
        const response = yield call(fetchOrdersApi, action);
        yield put({ type: FETCH_ORDERS_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_ORDERS_FAILED, error });
    }
}

function fetchOrdersApi(payload) {
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.orders_path + '/inCustomer',
        crossdomain: true
    });
}



function* getOrder(action) {
    try {
        const response = yield call(fetchOrderApi, action);
        yield put({ type: FETCH_ORDER_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_ORDER_FAILED, error });
    }
}

function fetchOrderApi(payload) {
    console.log('saga',payload)
    const { orderId } = payload
    console.log(orderId)

    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.orders_path + '/shortDetail/' + orderId,
        crossdomain: true
    });
}



export function* getTaxSaga() {
    yield takeLatest(FETCH_TAX, getTax)
}

export function* createOrderSaga() {
    yield takeLatest(CREATE_ORDER, createOrder)
}

export function* makePaymentSaga() {
    yield takeLatest(MAKE_PAYMENT, makePayment)
}

export function* getOrdersSaga() {
    yield takeLatest(FETCH_ORDERS, getOrders)
}

export function* getOrderSaga() {
    yield takeLatest(FETCH_ORDER, getOrder)
}
