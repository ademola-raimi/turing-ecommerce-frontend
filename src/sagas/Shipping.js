import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    FETCH_SHIPPING_REGION_FAILED,
    FETCH_SHIPPING_REGION,
    FETCH_SHIPPING_REGION_RECEIVED,
    FETCH_SHIPPING_REGION_PRICE_RECEIVED,
    FETCH_SHIPPING_REGION_PRICE,
    FETCH_SHIPPING_REGION_PRICE_FAILED
 } from '../actions/types';

function* getShippingRegion(action) {
    try {
        const response = yield call(fetchShippingRegionApi, action);
        yield put({ type: FETCH_SHIPPING_REGION_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_SHIPPING_REGION_FAILED, error });
    }
}

function fetchShippingRegionApi(payload) {
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.shipping_path,
        crossdomain: true
    });
}


function* getShippingRegionInfo(action) {
    try {
        const response = yield call(fetchShippingRegionInfoApi, action);
        yield put({ type: FETCH_SHIPPING_REGION_PRICE_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_SHIPPING_REGION_PRICE_FAILED, error });
    }
}

function fetchShippingRegionInfoApi(payload) {
    const {shippingRegionId} = payload;
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.shipping_path + '/' + shippingRegionId,
        crossdomain: true
    });
}

export function* getShippingRegionSaga() {
    yield takeLatest(FETCH_SHIPPING_REGION, getShippingRegion)
}

export function* getShippingRegionInfoSaga() {
    yield takeLatest(FETCH_SHIPPING_REGION_PRICE, getShippingRegionInfo)
}
