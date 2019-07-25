import { put, takeLatest, call } from 'redux-saga/effects';

import { default as axios } from '../api/axios-api';
import jwtDecode from 'jwt-decode';
import api from '../config/config.js';

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

 function fetchAuthenticationApi(data) {
    let url = api.api_path + api.version_path + api.customers_path + "/login";
    let credentials = {
        "email": data.payload.email,
        "password": data.payload.password
    }

    return axios.post(url, credentials);
}

function* getAndSetToken(action) {
    try {
        const response = yield call(fetchAuthenticationApi, action);
        const token = response.data.accessToken
        let decoded = jwtDecode(token);
        let customerId = decoded.customer_id;
        localStorage.setItem("customerId", customerId);
        localStorage.setItem("token", token);
        localStorage.setItem("customerName", response.data.customer.name);
        yield put({ type: SET_CUSTOMER_ID, customerId });
        yield put({ type: TOKEN, response });
    }
    catch(error) {
        console.error(error)
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
        const response = yield call(registerCustomerApi, action);
        yield put({ type: REGISTER_SUCCESSFUL, response });
    }
    catch(error) {
        console.error(error)
        yield put({ type: REGISTER_FAILED, error });
    }
}

function fetchCustomerApi(data) {
    let url = api.api_path + api.version_path + api.customer_path;

    return axios({
        method: "get",
        url: url,
        crossdomain: true
    });
}

function* fetchCustomer(action) {
    try {
        const response = yield call(fetchCustomerApi, action);
        yield put({ type: FETCH_CUSTOMER_DETAILS_RECEIVED, response });
    }
    catch(error) {
        console.error(error)
        yield put({ type: FETCH_CUSTOMER_DETAILS_FAILED, error });
    }
}

function updateCustomerAddressApi(data) {
    let url = api.api_path + api.version_path + api.customer_path;
    let credentials = {
        "name": data.payload.name,
        "email": data.payload.email,
        "mob_phone": data.payload.mob_phone,
        "day_phone": data.payload.day_phone,
        "eve_phone": data.payload.eve_phone
    }

    return axios.put(url, credentials);
}

function* updateCustomerAddress(action) {
    try {
        const response = yield call(updateCustomerAddressApi, action);
        yield put({ type: FETCH_CUSTOMER_DETAILS_RECEIVED, response });
    }
    catch(error) {
        console.error(error)
        yield put({ type: FETCH_CUSTOMER_DETAILS_FAILED, error });
    }
}


function updateRegionCustomerAddressApi(data) {
    let url = api.api_path + api.version_path + api.customers_path + '/address';
    let credentials = {
        "address_1": data.payload.address1,
        "address_2": data.payload.address2,
        "city": data.payload.city,
        "region": data.payload.region,
        "postal_code": data.payload.postal_code,
        "country": data.payload.country,
        "shipping_region_id": data.payload.shipping_region_id
    }

    return axios.put(url, credentials);
}

function* updateRegionCustomerAddress(action) {
    try {
        const response = yield call(updateRegionCustomerAddressApi, action);
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
