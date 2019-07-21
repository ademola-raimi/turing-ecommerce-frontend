import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';
import _ from 'lodash';

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
    let url;
    let newPayload;
    localStorage.setItem("cartId", payload.cartId);
    // let cartsInfo = JSON.parse(localStorage.getItem('cartsInfo'));
    // console.log('saga cartsInfo: ',cartsInfo)
    // if (!_.isNil(cartsInfo)) {

    //     _.forEach(cartsInfo, (cart) => {
    //         if (cart.productId === payload.productId) {
    //             url = api.api_path + api.version_path + api.shoppingCart_path + '/update/' + cart.itemId;
    //             newPayload = {
    //                 "quantity": cart.quantity + 1,
    //             }
    //         }
    //     });
    // } else {
    //     url = api.api_path + api.version_path + api.shoppingCart_path + '/add';

    //     newPayload = {
    //         "cart_id": payload.cartId,
    //         "product_id": payload.productId,
    //         "attributes": payload.attributes,
    //     }
    // }
    url = api.api_path + api.version_path + api.shoppingCart_path + '/add';

    newPayload = {
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
    let cartId = localStorage.getItem('cartId');
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
    let cartId = localStorage.getItem('cartId');
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.shoppingCart_path + '/totalCount/' + cartId,
        crossdomain: true
    });
}

function* getCarts(action) {
    try {
        const response = yield call(fetchCartsApi, action);
        console.log(response)
        yield put({ type: FETCH_ALL_CARTS_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_ALL_CARTS_FAILED, error });
    }
}

function fetchCartsApi(payload) {
    let cartId = localStorage.getItem('cartId');
    console.log(api.api_path + api.version_path + api.shoppingCart_path + '/' + cartId);
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.shoppingCart_path + '/' + cartId,
        crossdomain: true
    });
}

function* emptyCarts(action) {
    try {
        const response = yield call(emptyCartsApi, action);
        yield put({ type: EMPTY_CARTS_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: EMPTY_CARTS_FAILED, error });
    }
}

function emptyCartsApi(payload) {
    let cartId = localStorage.getItem('cartId');
    return axios({
        method: "delete",
        url: api.api_path + api.version_path + api.shoppingCart_path + '/empty/' + cartId,
        crossdomain: true
    });
}

function* removeProduct(action) {
    try {
        const response = yield call(removeProductApi, action);
        yield put({ type: REMOVE_PRODUCT_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: REMOVE_PRODUCT_FAILED, error });
    }
}

function removeProductApi(payload) {
    const { itemId } = payload;
    return axios({
        method: "delete",
        url: api.api_path + api.version_path + api.shoppingCart_path + '/removeProduct/' + itemId,
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

export function* getCartsSaga() {
    yield takeLatest(FETCH_ALL_CARTS, getCarts)
}

export function* emptyCartsSaga() {
    yield takeLatest(EMPTY_CARTS, emptyCarts)
}

export function* removeProductSaga() {
    yield takeLatest(REMOVE_PRODUCT, removeProduct)
}
