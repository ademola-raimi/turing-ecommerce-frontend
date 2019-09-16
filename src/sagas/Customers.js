import { put, takeLatest, call } from 'redux-saga/effects';

import { default as axios } from '../api/axios-api';
import jwtDecode from 'jwt-decode';
import api from '../config/config.js';
import authApiHelper from '../api/authApiHelper.js';
import customerApiHelper from '../api/customerApiHelper.js';

import {
    FETCH_TOKEN,
    TOKEN,
    TOKEN_FAILED,
    SET_CUSTOMER_ID,
    REGISTER_SUCCESSFUL,
    REGISTER_FAILED,
    REGISTER_CUSTOMER,
    FETCH_CUSTOMER_DETAILS,
    FETCH_CUSTOMER_DETAILS_RECEIVED,
    FETCH_CUSTOMER_DETAILS_FAILED,
    UPDATE_ADDRESS,
    UPDATE_ADDRESS_RECEIVED,
    UPDATE_ADDRESS_FAILED,
    UPDATE_REGION_ADDRESS,
    UPDATE_REGION_ADDRESS_RECEIVED,
    UPDATE_REGION_ADDRESS_FAILED
 } from '../actions/types';

function* getAndSetToken(action) {
    try {
        const response = yield call(authApiHelper.fetchAuthenticationApi, action);
        const token = response.data.accessToken
        let decoded = jwtDecode(token);
        let customerId = decoded.customer_id;
        localStorage.setItem("customerId", customerId);
        localStorage.setItem("token", token);
        localStorage.setItem("customerName", response.data.customer.name);
        yield put({ type: TOKEN, response });
        yield put({ type: SET_CUSTOMER_ID, customerId });
    }
    catch(error) {
        console.error("error",error)
        yield put({ type: TOKEN_FAILED, error });
    }
}

function registerCustomerApi(data) {
    let url = api.api_path + api.version_path + api.customers_path;
    let credentials = {
        "name": data.payload.name,
        "email": data.payload.email,
        "password": data.payload.password
    }

    return axios.post(url, credentials);
}

function* registerCustomer(action) {
    try {
        const response = yield call(authApiHelper.registerCustomerApi, action);
        yield put({ type: REGISTER_SUCCESSFUL, response });
    }
    catch(error) {
        console.error(error)
        yield put({ type: REGISTER_FAILED, error });
    }
}

function* fetchCustomer(action) {
    try {
        const response = yield call(customerApiHelper.fetchCustomerApi, action);
        yield put({ type: FETCH_CUSTOMER_DETAILS_RECEIVED, response });
    }
    catch(error) {
        console.error("error: ",error)
        yield put({ type: FETCH_CUSTOMER_DETAILS_FAILED, error });
    }
}

function* updateCustomerAddress(action) {
    try {
        const response = yield call(customerApiHelper.updateCustomerAddressApi, action);
        yield put({ type: FETCH_CUSTOMER_DETAILS_RECEIVED, response });
    }
    catch(error) {
        console.error(error)
        yield put({ type: FETCH_CUSTOMER_DETAILS_FAILED, error });
    }
}

function* updateRegionCustomerAddress(action) {
    try {
        const response = yield call(customerApiHelper.updateRegionCustomerAddressApi, action);
        yield put({ type: FETCH_CUSTOMER_DETAILS_RECEIVED, response });
    }
    catch(error) {
        console.error(error)
        yield put({ type: FETCH_CUSTOMER_DETAILS_FAILED, error });
    }
}

export function* getTokenSaga() {
    yield takeLatest(FETCH_TOKEN, getAndSetToken)
}

export function* registerCustomerSaga() {
    yield takeLatest(REGISTER_CUSTOMER, registerCustomer)
}

export function* fetchCustomerSaga() {
    yield takeLatest(FETCH_CUSTOMER_DETAILS, fetchCustomer)
}

export function* updateCustomerSaga() {
    yield takeLatest(UPDATE_ADDRESS, updateCustomerAddress)
}

export function* updateRegionCustomerSaga() {
    yield takeLatest(UPDATE_REGION_ADDRESS, updateRegionCustomerAddress)
}
