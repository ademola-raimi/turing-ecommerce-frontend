import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    SAVE_CART,
    SAVE_CART_RECIEVED,
    SAVE_CART_FAILED,
    FETCH_CART_ID,
    FETCH_CART_ID_RECEIVED,
    FETCH_CART_ID_FAILED,
    TOTAL_AMOUNT_RECIEVED,
    FETCH_TOTAL_AMOUNT,
    TOTAL_AMOUNT_FAILED,
    FETCH_CART_COUNT,
    FETCH_CART_COUNT_RECIEVED,
    FECTH_CART_COUNT_FAILED
 } from '../actions/types';



function* getCartId(action) {
    try {
        const response = yield call(fetchCartIdApi, action);
        yield put({ type: FETCH_CART_ID_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_CART_ID_FAILED, error });
    }
}

function fetchCartIdApi(payload) {
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.shoppingCart_path + '/generateUniqueId',
        crossdomain: true
    });
}

function* saveCart(action) {
    try {
        const response = yield call(saveCartApi, action);
        yield put({ type: SAVE_CART_RECIEVED, response });
    }
    catch(error) {
        yield put({ type: SAVE_CART_FAILED, error });
    }
}

function saveCartApi(payload) {
    localStorage.setItem("cartId", payload.cartId);
    let url = api.api_path + api.version_path + api.shoppingCart_path + '/add';
    let newPayload = {
        "cart_id": payload.cartId,
        "product_id": payload.productId,
        "attributes": payload.attributes,
    }

    return axios.post(url, newPayload);
}

function* getCartAmt(action) {
    try {
        const response = yield call(fetchCartAmtApi, action);
        yield put({ type: TOTAL_AMOUNT_RECIEVED, response });
    }
    catch(error) {
        yield put({ type: TOTAL_AMOUNT_FAILED, error });
    }
}

function fetchCartAmtApi(payload) {
    let cartId = localStorage.getItem('cartId');;
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.shoppingCart_path + '/totalAmount/' + cartId,
        crossdomain: true
    });
}

function* getCartCount(action) {
    try {
        const response = yield call(fetchCartCountApi, action);
        yield put({ type: FETCH_CART_COUNT_RECIEVED, response });
    }
    catch(error) {
        yield put({ type: FECTH_CART_COUNT_FAILED, error });
    }
}

function fetchCartCountApi(payload) {
    // console.log(api.api_path + api.version_path + api.shoppingCart_path + '/generateUniqueId');
    let cartId = localStorage.getItem('cartId');;
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.shoppingCart_path + '/totalCount/' + cartId,
        crossdomain: true
    });
}

export function* getCartIdSaga() {
    yield takeLatest(FETCH_CART_ID, getCartId)
}

export function* saveCartSaga() {
    yield takeLatest(SAVE_CART, saveCart)
}

export function* getCartAmountSaga() {
    yield takeLatest(FETCH_TOTAL_AMOUNT, getCartAmt)
}

export function* getCartCountSaga() {
    yield takeLatest(FETCH_CART_COUNT, getCartCount)
}
