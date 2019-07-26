import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    FETCH_DEPARTMENTS,
    FETCH_DEPARTMENTS_RECEIVED,
    FETCH_DEPARTMENTS_FAILED
 } from '../actions/types';



function* getDepartments(action) {
    try {
        const response = yield call(fetchDepartmentsApi, action);
        yield put({ type: FETCH_DEPARTMENTS_RECEIVED, response, resetList: action.resetList });
    }
    catch(error) {
        yield put({ type: FETCH_DEPARTMENTS_FAILED, error });
    }
}

function fetchDepartmentsApi(payload) {
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.departments_path,
        crossdomain: true
    });
}

export function* getDepartmentsSaga() {
    yield takeLatest(FETCH_DEPARTMENTS, getDepartments)
}
