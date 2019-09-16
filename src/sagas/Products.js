import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';
import productsApiHelper from '../api/productsApiHelper.js';

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
    FETCH_PRODUCTS_CATEGORY_RECEIVED,
    FETCH_PRODUCTS_DEPARTMENT,
    FETCH_PRODUCTS_DEPARTMENT_FAILED,
    FETCH_PRODUCTS_DEPARTMENT_RECEIVED
 } from '../actions/types';

function* getProducts(action) {
    try {
        const response = yield call(productsApiHelper.fetchProductsApi, action);
        yield put({ type: FETCH_PRODUCTS_RECEIVED, response, resetList: action.resetList });
    }
    catch(error) {
        yield put({ type: FETCH_PRODUCTS_FAILED, error });
    }
}

function* getProduct(action) {
    try {
        const response = yield call(productsApiHelper.fetchProductApi, action);
        yield put({ type: FETCH_PRODUCT_RECEIVED, response});
    }
    catch(error) {
        yield put({ type: FETCH_PRODUCT_FAILED, error });
    }
}

function* getAttributes(action) {
    try {
        const response = yield call(productsApiHelper.fetchAttributesApi, action);
        yield put({ type: FETCH_ATTRIBUTES_RECEIVED, response});
    }
    catch(error) {
        yield put({ type: FETCH_ATTRIBUTES_FAILED, error });
    }
}

function* searchProducts(action) {
    try {
        const response = yield call(productsApiHelper.searchProductsApi, action);
        yield put({ type: SEARCH_PRODUCT_RECEIVED, response, resetList: action.resetList, searchValue: action.searchValue });
    }
    catch(error) {
        yield put({ type: SEARCH_PRODUCT_FAILED, error });
    }
}

function* fetchProductsCategory(action) {
    try {
        const response = yield call(productsApiHelper.fetchProductsCategoryApi, action);
        yield put({ type: FETCH_PRODUCTS_CATEGORY_RECEIVED, response, resetList: action.resetList, categoryId: action.categoryId });
    }
    catch(error) {
        yield put({ type: FETCH_PRODUCTS_CATEGORY_FAILED, error });
    }
}

function* fetchProductsDepartment(action) {
    try {
        const response = yield call(productsApiHelper.fetchProductsDepartmentApi, action);
        yield put({ type: FETCH_PRODUCTS_DEPARTMENT_RECEIVED, response, resetList: action.resetList, departmentId: action.departmentId });
    }
    catch(error) {
        yield put({ type: FETCH_PRODUCTS_DEPARTMENT_FAILED, error });
    }
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
export function* fetchProductsDepartmentSaga() {
    yield takeLatest(FETCH_PRODUCTS_DEPARTMENT, fetchProductsDepartment)
}
