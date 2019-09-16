import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import axios from 'axios';
import { throwError } from 'redux-saga-test-plan/providers';
import authApiHelper from '../api/authApiHelper.js';
import customerApiHelper from '../api/customerApiHelper.js';
import { getTokenSaga, registerCustomerSaga, fetchCustomerSaga, updateCustomerSaga, updateRegionCustomerSaga } from '../sagas/Customers.js';
import { default as CustomerStore } from '../reducers/Customers.js';
import helper_factory from './factory/helperFactory';


const error = new Error('Error');
const customer = {
    "customer": {
        "customer_id": 22,
        "name": "Ademola",
        "email": "ademolaraimi.nig@gmail.com",
        "credit_card": "",
        "address_1": null,
        "address_2": null,
        "city": null,
        "region": null,
        "postal_code": null,
        "country": null,
        "shipping_region_id": 1,
        "day_phone": null,
        "eve_phone": null,
        "mob_phone": null
    },
    "accessToken": helper_factory.testToken,
    "expires_in": "24h"
}

describe('customer Auth and reducers', () => {
    const authAction = { payload: {email: 'ademolaraimi.nig@gmail', password: 'london' }};
    const registerAction = { payload: { name: 'Ademola', email: 'ademolaraimi.nig@gmail', password: 'london' }};
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('fetches the token and customerId successfully', () => {
        const response = {
            data: {
                "customer": {
                    "customer_id": 22,
                    "name": "Ademola",
                    "email": "ademolaraimi.nig@gmail.com",
                    "credit_card": "",
                    "address_1": null,
                    "address_2": null,
                    "city": null,
                    "region": null,
                    "postal_code": null,
                    "country": null,
                    "shipping_region_id": 1,
                    "day_phone": null,
                    "eve_phone": null,
                    "mob_phone": null
                },
                "accessToken": helper_factory.testToken,
                "expires_in": "24h"
            }
        };
        return expectSaga(getTokenSaga)
            .withReducer(CustomerStore)
            .provide([
                [matchers.call.fn(authApiHelper.fetchAuthenticationApi, authAction),
                response]
            ])
            .put({
                type: 'SET_CUSTOMER_ID',
                customerId: 22
            })
            .put({
                type: 'TOKEN',
                response
            })
            .dispatch({
                type: 'FETCH_TOKEN',
                authAction
            })
            .hasFinalState({
                authenticated: true,
                isLoading: false,
                isAdmin: false,
                registerSuccess: false,
                hasError: false,
                activeCustomer: null
            })
            .silentRun();
    });
    it('fetches the token and customerId unsuccesfully', () => {
        return expectSaga(getTokenSaga)
            .withReducer(CustomerStore)
            .provide([
                [
                    matchers.call.fn(authApiHelper.fetchAuthenticationApi, authAction),
                    throwError(error)
                ]
            ])
            .put({
                type: 'TOKEN_FAILED',
                error
            })
            .dispatch({
                type: 'FETCH_TOKEN',
                authAction
            })
            .hasFinalState({
                authenticated: false,
                isLoading: false,
                isAdmin: false,
                registerSuccess: false,
                hasError: true,
                activeCustomer: null,
            })
            .silentRun();
    });

    it('register a customer successfully', () => {
        const response = {
            data: {
                "customer": {
                    "customer_id": 22,
                    "name": "Ademola",
                    "email": "ademolaraimi.nig@gmail.com",
                    "credit_card": "",
                    "address_1": null,
                    "address_2": null,
                    "city": null,
                    "region": null,
                    "postal_code": null,
                    "country": null,
                    "shipping_region_id": 1,
                    "day_phone": null,
                    "eve_phone": null,
                    "mob_phone": null
                },
                "accessToken": helper_factory.testToken,
                "expires_in": "24h"
            }
        };
        return expectSaga(registerCustomerSaga)
            .withReducer(CustomerStore)
            .provide([
                [matchers.call.fn(authApiHelper.registerCustomerApi, registerAction),
                response]
            ])
            .put({
                type: 'REGISTER_SUCCESSFUL',
                response
            })
            .dispatch({
                type: 'REGISTER_CUSTOMER',
                registerAction
            })
            .hasFinalState({
                authenticated: false,
                isLoading: false,
                isAdmin: false,
                registerSuccess: true,
                hasError: false,
                activeCustomer: null
            })
            .silentRun();
    });

    it('should register a customer unsuccessfully', () => {
        return expectSaga(registerCustomerSaga)
            .withReducer(CustomerStore)
            .provide([
                [
                    matchers.call.fn(authApiHelper.registerCustomerApi, registerAction),
                    throwError(error)
                ]
            ])
            .put({
                type: 'REGISTER_FAILED',
                error
            })
            .dispatch({
                type: 'REGISTER_CUSTOMER',
                registerAction
            })
            .hasFinalState({
                authenticated: false,
                isLoading: false,
                isAdmin: false,
                registerSuccess: false,
                hasError: true,
                activeCustomer: null,
            })
            .silentRun();
    });
});

describe('fetch customer and reducers', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('fetches customer successfully', () => {
        const response = {
            data: {
                "customer": {
                    "customer_id": 22,
                    "name": "Ademola",
                    "email": "ademolaraimi.nig@gmail.com",
                    "credit_card": "",
                    "address_1": null,
                    "address_2": null,
                    "city": null,
                    "region": null,
                    "postal_code": null,
                    "country": null,
                    "shipping_region_id": 1,
                    "day_phone": null,
                    "eve_phone": null,
                    "mob_phone": null
                },
                "accessToken": helper_factory.testToken,
                "expires_in": "24h"
            }
        };
        return expectSaga(fetchCustomerSaga)
            .withReducer(CustomerStore)
            .provide([
                [matchers.call.fn(customerApiHelper.fetchCustomerApi, {type: 'FETCH_CUSTOMER_DETAILS'}),
                response]
            ])
            .put({
                type: 'FETCH_CUSTOMER_DETAILS_RECEIVED',
                response
            })
            .dispatch({
                type: 'FETCH_CUSTOMER_DETAILS',
            })
            .hasFinalState({
                authenticated: false,
                isLoading: false,
                isAdmin: false,
                registerSuccess: false,
                hasError: false,
                activeCustomer: customer
            })
            .silentRun();
    });

    it('fetches customer unsuccessfully', () => {
        const response = {
            data: {
                "customer": {
                    "customer_id": 22,
                    "name": "Ademola",
                    "email": "ademolaraimi.nig@gmail.com",
                    "credit_card": "",
                    "address_1": null,
                    "address_2": null,
                    "city": null,
                    "region": null,
                    "postal_code": null,
                    "country": null,
                    "shipping_region_id": 1,
                    "day_phone": null,
                    "eve_phone": null,
                    "mob_phone": null
                },
                "accessToken": helper_factory.testToken,
                "expires_in": "24h"
            }
        };
        return expectSaga(fetchCustomerSaga)
            .withReducer(CustomerStore)
            .provide([
                [matchers.call.fn(customerApiHelper.fetchCustomerApi, {type: 'FETCH_CUSTOMER_DETAILS'}),
                throwError(error)]
            ])
            .put({
                type: 'FETCH_CUSTOMER_DETAILS_FAILED',
                error
            })
            .dispatch({
                type: 'FETCH_CUSTOMER_DETAILS',
            })
            .hasFinalState({
                authenticated: false,
                isLoading: false,
                isAdmin: false,
                registerSuccess: false,
                hasError: true,
                activeCustomer: null
            })
            .silentRun();
    });
});

describe('update customer and reducers', () => {
    const action = { payload: {name: "Ademola", email: 'ademolaraimi.nig@gmail', mob_phone: '08132186889', day_phone: '08132186889', eve_phone: '08132186889' }};
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('update customer successfully', () => {
        const response = {
            data: {
                "customer": {
                    "customer_id": 22,
                    "name": "Ademola",
                    "email": "ademolaraimi.nig@gmail.com",
                    "credit_card": "",
                    "address_1": null,
                    "address_2": null,
                    "city": null,
                    "region": null,
                    "postal_code": null,
                    "country": null,
                    "shipping_region_id": 1,
                    "day_phone": null,
                    "eve_phone": null,
                    "mob_phone": null
                },
                "accessToken": helper_factory.testToken,
                "expires_in": "24h"
            }
        };
        return expectSaga(updateCustomerSaga)
            .withReducer(CustomerStore)
            .provide([
                [matchers.call.fn(customerApiHelper.updateCustomerAddressApi, action),
                response]
            ])
            .put({
                type: 'FETCH_CUSTOMER_DETAILS_RECEIVED',
                response
            })
            .dispatch({
                type: 'UPDATE_ADDRESS',
                action
            })
            .hasFinalState({
                authenticated: false,
                isLoading: false,
                isAdmin: false,
                registerSuccess: false,
                hasError: false,
                activeCustomer: customer
            })
            .silentRun();
    });

    it('update customer unsuccesfully', () => {
        return expectSaga(updateCustomerSaga)
            .withReducer(CustomerStore)
            .provide([
                [
                    matchers.call.fn(customerApiHelper.updateCustomerAddressApi, action),
                    throwError(error)
                ]
            ])
            .put({
                type: 'FETCH_CUSTOMER_DETAILS_FAILED',
                error
            })
            .dispatch({
                type: 'UPDATE_ADDRESS',
                action
            })
            .hasFinalState({
                authenticated: false,
                isLoading: false,
                isAdmin: false,
                registerSuccess: false,
                hasError: true,
                activeCustomer: null,
            })
            .silentRun();
    });
});

describe('update region customer and reducers', () => {
    const action = { payload: {address1: "ishaga", address2: 'iju', city: 'station', region: 'lagos', postal_code: '23401', country: "Nigeria", shipping_region_id: 1 }};
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('update region customer successfully', () => {
        const response = {
            data: {
                "customer": {
                    "customer_id": 22,
                    "name": "Ademola",
                    "email": "ademolaraimi.nig@gmail.com",
                    "credit_card": "",
                    "address_1": null,
                    "address_2": null,
                    "city": null,
                    "region": null,
                    "postal_code": null,
                    "country": null,
                    "shipping_region_id": 1,
                    "day_phone": null,
                    "eve_phone": null,
                    "mob_phone": null
                },
                "accessToken": helper_factory.testToken,
                "expires_in": "24h"
            }
        };
        return expectSaga(updateRegionCustomerSaga)
            .withReducer(CustomerStore)
            .provide([
                [matchers.call.fn(customerApiHelper.updateRegionCustomerAddressApi, action),
                response]
            ])
            .put({
                type: 'FETCH_CUSTOMER_DETAILS_RECEIVED',
                response
            })
            .dispatch({
                type: 'UPDATE_REGION_ADDRESS',
                action
            })
            .hasFinalState({
                authenticated: false,
                isLoading: false,
                isAdmin: false,
                registerSuccess: false,
                hasError: false,
                activeCustomer: customer
            })
            .silentRun();
    });

    it('update customer unsuccesfully', () => {
        return expectSaga(updateRegionCustomerSaga)
            .withReducer(CustomerStore)
            .provide([
                [
                    matchers.call.fn(customerApiHelper.updateRegionCustomerAddressApi, action),
                    throwError(error)
                ]
            ])
            .put({
                type: 'FETCH_CUSTOMER_DETAILS_FAILED',
                error
            })
            .dispatch({
                type: 'UPDATE_REGION_ADDRESS',
                action
            })
            .hasFinalState({
                authenticated: false,
                isLoading: false,
                isAdmin: false,
                registerSuccess: false,
                hasError: true,
                activeCustomer: null,
            })
            .silentRun();
    });
});