import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    FETCH_COLOR_ATTRIBUTES,
    ATTRIBUTES_COLOR_RECEIVED,
    ATTRIBUTES_COLOR_FAILED,
    FETCH_SIZE_ATTRIBUTES,
    ATTRIBUTES_SIZE_RECEIVED,
    ATTRIBUTES_SIZE_FAILED
 } from '../actions/types';



function* getAttributesColor(action) {
    try {
        const response = yield call(fetchAttributesColorApi, action);

        yield put({ type: ATTRIBUTES_COLOR_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: ATTRIBUTES_COLOR_FAILED, error });
    }
}

function fetchAttributesColorApi(payload) {
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.attributes_value_path + "/2",
        // params: params,
        crossdomain: true
    });
}

function* getAttributesSize(action) {
    try {
        const response = yield call(fetchAttributesSizeApi, action);

        yield put({ type: ATTRIBUTES_SIZE_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: ATTRIBUTES_SIZE_FAILED, error });
    }
}

function fetchAttributesSizeApi(payload) {
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.attributes_value_path + "/1",
        // params: params,
        crossdomain: true
    });
}

export function* getAttributesColorSaga() {
    yield takeLatest(FETCH_COLOR_ATTRIBUTES, getAttributesColor)
}

export function* getAttributesSizeSaga() {
    yield takeLatest(FETCH_SIZE_ATTRIBUTES, getAttributesSize)
}
