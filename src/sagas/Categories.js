import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_RECEIVED,
    FETCH_CATEGORIES_FAILED
 } from '../actions/types';



function* getCategories(action) {
    try {
        const response = yield call(fetchCategoriesApi, action);
        yield put({ type: FETCH_CATEGORIES_RECEIVED, response, resetList: action.resetList });
    }
    catch(error) {
        yield put({ type: FETCH_CATEGORIES_FAILED, error });
    }
}

function fetchCategoriesApi(payload) {
    console.log(api.api_path + api.version_path + api.categories_path)
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.categories_path,
        // params: params,
        crossdomain: true
    });
}

export function* getCategoriesSaga() {
    yield takeLatest(FETCH_CATEGORIES, getCategories)
}
