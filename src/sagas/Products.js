import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    FETCH_PRODUCTS,
    RESET,
    FETCH_PRODUCTS_RECEIVED,
    FETCH_PRODUCTS_FAILED,
    FETCH_PRODUCT_RECEIVED,
    FETCH_PRODUCT_FAILED,
    FETCH_PRODUCT,
    FETCH_ATTRIBUTES,
    FETCH_ATTRIBUTES_RECEIVED,
    FETCH_ATTRIBUTES_FAILED,
    SEARCH_PRODUCT,
    SEARCH_PRODUCT_FAILED,
    SEARCH_PRODUCT_RECEIVED,
    FETCH_PRODUCTS_CATEGORY,
    FETCH_PRODUCTS_CATEGORY_FAILED,
    FETCH_PRODUCTS_CATEGORY_RECEIVED
 } from '../actions/types';

function* getProducts(action) {
    try {
        const response = yield call(fetchProductsApi, action);
        yield put({ type: FETCH_PRODUCTS_RECEIVED, response, resetList: action.resetList });
    }
    catch(error) {
        yield put({ type: FETCH_PRODUCTS_FAILED, error });
    }
}

function fetchProductsApi(payload) {
    // console.log('payload: ',api.api_path + api.version_path + api.products_path)
    // build the params based on available content in payload
    // this will work for searching and displaying the full list of videos
    let params = {};
    // params.content_type = payload.content_type;
    // if(payload.limit) params.limit = payload.limit;
    // if(payload.offset >= 0) params.offset = payload.offset;
    // if(payload.search_term) params.search_term = payload.search_term;
    // if(payload.sort && !params.search_term) params.sort = payload.sort;
    // if(payload.producer_id.length  > 0) params.producer_id = payload.producer_id;
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.products_path,
        params: params,
        crossdomain: true
    });
}

function* getProduct(action) {
    try {
        const response = yield call(fetchProductApi, action);
        yield put({ type: FETCH_PRODUCT_RECEIVED, response});
    }
    catch(error) {
        yield put({ type: FETCH_PRODUCT_FAILED, error });
    }
}

function fetchProductApi(payload) {
    const { productId } = payload;
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.products_path + '/' + productId + '/details',
        crossdomain: true
    });
}

function* getAttributes(action) {
    try {
        const response = yield call(fetchAttributesApi, action);
        yield put({ type: FETCH_ATTRIBUTES_RECEIVED, response});
    }
    catch(error) {
        yield put({ type: FETCH_ATTRIBUTES_FAILED, error });
    }
}

function fetchAttributesApi(payload) {
    const { productId } = payload;
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.attributes_path + '/inProduct/' + productId,
        crossdomain: true
    });
}



function* searchProducts(action) {
    try {
        const response = yield call(searchProductsApi, action);
        yield put({ type: SEARCH_PRODUCT_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: SEARCH_PRODUCT_FAILED, error });
    }
}

function searchProductsApi(payload) {
    // console.log('payload: ',api.api_path + api.version_path + api.products_path)
    // build the params based on available content in payload
    // this will work for searching and displaying the full list of videos
    let params = {};
    let url;
    if (payload.searchValue) {
        params.query_string = payload.searchValue;
        url = api.api_path + api.version_path + api.products_path + '/search'
    } else {
        url = api.api_path + api.version_path + api.products_path
    }
    // if(payload.limit) params.limit = payload.limit;
    // if(payload.offset >= 0) params.offset = payload.offset;
    // if(payload.search_term) params.search_term = payload.search_term;
    // if(payload.sort && !params.search_term) params.sort = payload.sort;
    // if(payload.producer_id.length  > 0) params.producer_id = payload.producer_id;
    return axios({
        method: "get",
        url: url,
        params: params,
        crossdomain: true
    });
}



function* fetchProductsCategory(action) {
    try {
        const response = yield call(fetchProductsCategoryApi, action);
        yield put({ type: FETCH_PRODUCTS_CATEGORY_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_PRODUCTS_CATEGORY_FAILED, error });
    }
}

function fetchProductsCategoryApi(payload) {
    const { categoryId } = payload
    // console.log('payload: ',api.api_path + api.version_path + api.products_path)
    // build the params based on available content in payload
    // this will work for searching and displaying the full list of videos
    let params = {};
    let url;
    if (payload.categoryId != null) {
        url =api.api_path + api.version_path + api.products_path + '/inCategory/' + categoryId;
    } else {
        url = api.api_path + api.version_path + api.products_path
    }
    // if(payload.limit) params.limit = payload.limit;
    // if(payload.offset >= 0) params.offset = payload.offset;
    // if(payload.search_term) params.search_term = payload.search_term;
    // if(payload.sort && !params.search_term) params.sort = payload.sort;
    // if(payload.producer_id.length  > 0) params.producer_id = payload.producer_id;
    return axios({
        method: "get",
        url: url,
        params: params,
        crossdomain: true
    });
}

export function* getProductsSaga() {
    yield takeLatest(FETCH_PRODUCTS, getProducts)
}

export function* getProductSaga() {
    yield takeLatest(FETCH_PRODUCT, getProduct)
}

export function* getAttributesSaga() {
    yield takeLatest(FETCH_ATTRIBUTES, getAttributes)
}

export function* searchProductSaga() {
    yield takeLatest(SEARCH_PRODUCT, searchProducts)
}

export function* fetchProductsCategorySaga() {
    yield takeLatest(FETCH_PRODUCTS_CATEGORY, fetchProductsCategory)
}
