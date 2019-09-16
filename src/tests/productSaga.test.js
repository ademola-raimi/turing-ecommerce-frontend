import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import axios from 'axios';
import { throwError } from 'redux-saga-test-plan/providers';
import { getProductsSaga, getProductSaga, getAttributesSaga, searchProductSaga, fetchProductsCategorySaga, fetchProductsDepartmentSaga } from '../sagas/Products.js';
import { default as ProductsStore } from '../reducers/Products.js';
import helper_factory from './factory/helperFactory';
import productsApiHelper from '../api/productsApiHelper.js';


const error = new Error('Error');

describe('products and reducers', () => {
    const action = { resetList: true, page: 1 };
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });
    const response = helper_factory.products
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('fetches product successfully', () => {
        return expectSaga(getProductsSaga)
            .withReducer(ProductsStore)
            .provide([
                [matchers.call.fn(productsApiHelper.fetchProductsApi, action),
                response]
            ])
            .put({
                type: 'FETCH_PRODUCTS_RECEIVED',
                response,
                resetList: undefined
            })
            .dispatch({
                type: 'FETCH_PRODUCTS'
            })
            .hasFinalState({
                hasError: false,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: helper_factory.products.data.data,
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: false,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: false,
                activeCategoryId: null,
                searchValue: null,
                categoryPage: 1,
                departmentPage: 1,
                searchPage: 1,
                page: 2
            })
            .silentRun();
    });
    it('fetches products unsuccesfully', () => {
        return expectSaga(getProductsSaga)
            .withReducer(ProductsStore)
            .provide([
                [
                    matchers.call.fn(productsApiHelper.fetchProductsApi, action),
                    throwError(error)
                ]
            ])
            .put({
                type: 'FETCH_PRODUCTS_FAILED',
                error
            })
            .dispatch({
                type: 'FETCH_PRODUCTS',
            })
            .hasFinalState({
                hasError: true,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: [],
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: false,
                activeCategoryId: null,
                searchValue: null,
                categoryPage: 1,
                departmentPage: 1,
                searchPage: 1,
                page: 2
            })
            .silentRun();
    });
});

describe('product and reducers', () => {
    const action = { productId: 1 };
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });
    const response = helper_factory.product
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('fetches product successfully', () => {
        return expectSaga(getProductSaga)
            .withReducer(ProductsStore)
            .provide([
                [matchers.call.fn(productsApiHelper.fetchProductApi, action),
                response]
            ])
            .put({
                type: 'FETCH_PRODUCT_RECEIVED',
                response,
            })
            .dispatch({
                type: 'FETCH_PRODUCT'
            })
            .hasFinalState({
                hasError: false,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: [],
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: false,
                activeCategoryId: null,
                searchValue: null,
                categoryPage: 1,
                departmentPage: 1,
                searchPage: 1,
                page: 2,
                isProductLoading: false,
                product: helper_factory.product.data
            })
            .silentRun();
    });
    it('fetches product unsuccesfully', () => {
        return expectSaga(getProductSaga)
            .withReducer(ProductsStore)
            .provide([
                [
                    matchers.call.fn(productsApiHelper.fetchProductApi, action),
                    throwError(error)
                ]
            ])
            .put({
                type: 'FETCH_PRODUCT_FAILED',
                error
            })
            .dispatch({
                type: 'FETCH_PRODUCT',
            })
            .hasFinalState({
                hasError: true,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: [],
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: false,
                activeCategoryId: null,
                searchValue: null,
                categoryPage: 1,
                departmentPage: 1,
                searchPage: 1,
                page: 2
            })
            .silentRun();
    });
});

describe('attributes and reducers', () => {
    const action = { productId: 1 };
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });
    const response = helper_factory.productAttributes
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('fetches attributes successfully', () => {
        return expectSaga(getAttributesSaga)
            .withReducer(ProductsStore)
            .provide([
                [matchers.call.fn(productsApiHelper.fetchAttributesApi, action),
                response]
            ])
            .put({
                type: 'FETCH_ATTRIBUTES_RECEIVED',
                response,
            })
            .dispatch({
                type: 'FETCH_ATTRIBUTES'
            })
            .hasFinalState({
                hasError: false,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: [],
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: helper_factory.productAttributes.data,
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: false,
                activeCategoryId: null,
                searchValue: null,
                categoryPage: 1,
                departmentPage: 1,
                searchPage: 1,
                page: 2
            })
            .silentRun();
    });
    it('fetches attributes unsuccesfully', () => {
        return expectSaga(getAttributesSaga)
            .withReducer(ProductsStore)
            .provide([
                [
                    matchers.call.fn(productsApiHelper.fetchAttributesApi, action),
                    throwError(error)
                ]
            ])
            .put({
                type: 'FETCH_ATTRIBUTES_FAILED',
                error
            })
            .dispatch({
                type: 'FETCH_ATTRIBUTES',
            })
            .hasFinalState({
                hasError: true,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: [],
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: false,
                activeCategoryId: null,
                searchValue: null,
                categoryPage: 1,
                departmentPage: 1,
                searchPage: 1,
                page: 2
            })
            .silentRun();
    });
});

describe('search products and reducers', () => {
    const action = { searchValue: "arc", resetList: true };
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });
    const response = helper_factory.products
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('search products successfully', () => {
        return expectSaga(searchProductSaga)
            .withReducer(ProductsStore)
            .provide([
                [matchers.call.fn(productsApiHelper.searchProductsApi, action),
                response]
            ])
            .put({
                type: 'SEARCH_PRODUCT_RECEIVED',
                response,
                resetList: undefined,
                searchValue: undefined
            })
            .dispatch({
                type: 'SEARCH_PRODUCT'
            })
            .hasFinalState({
                hasError: false,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: helper_factory.products.data.data,
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: true,
                activeCategoryId: null,
                searchValue: undefined,
                categoryPage: 1,
                departmentPage: 1,
                searchPage: 2,
                page: 2,
                isProductLoading: false
            })
            .silentRun();
    });
    it('search products unsuccesfully', () => {
        return expectSaga(searchProductSaga)
            .withReducer(ProductsStore)
            .provide([
                [
                    matchers.call.fn(productsApiHelper.searchProductsApi, action),
                    throwError(error)
                ]
            ])
            .put({
                type: 'SEARCH_PRODUCT_FAILED',
                error
            })
            .dispatch({
                type: 'SEARCH_PRODUCT',
            })
            .hasFinalState({
                hasError: true,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: [],
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: false,
                activeCategoryId: null,
                searchValue: null,
                categoryPage: 1,
                departmentPage: 1,
                searchPage: 2,
                page: 2
            })
            .silentRun();
    });
});

describe('fetch products category and reducers', () => {
    const action = { resetList: true, categoryId: 1 };
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });
    const response = helper_factory.products
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('fetch products category successfully', () => {
        return expectSaga(fetchProductsCategorySaga)
            .withReducer(ProductsStore)
            .provide([
                [matchers.call.fn(productsApiHelper.fetchProductsCategoryApi, action),
                response]
            ])
            .put({
                type: 'FETCH_PRODUCTS_CATEGORY_RECEIVED',
                response,
                resetList: undefined,
                categoryId: undefined
            })
            .dispatch({
                type: 'FETCH_PRODUCTS_CATEGORY'
            })
            .hasFinalState({
                hasError: false,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: helper_factory.products.data.data,
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: true,
                fetchProductssearch: false,
                activeCategoryId: undefined,
                searchValue: null,
                categoryPage: 2,
                departmentPage: 1,
                searchPage: 2,
                page: 2,
                isProductLoading: false
            })
            .silentRun();
    });
    it('fetch products category unsuccesfully', () => {
        return expectSaga(fetchProductsCategorySaga)
            .withReducer(ProductsStore)
            .provide([
                [
                    matchers.call.fn(productsApiHelper.fetchProductsCategoryApi, action),
                    throwError(error)
                ]
            ])
            .put({
                type: 'FETCH_PRODUCTS_CATEGORY_FAILED',
                error
            })
            .dispatch({
                type: 'FETCH_PRODUCTS_CATEGORY',
            })
            .hasFinalState({
                hasError: true,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: [],
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: false,
                activeCategoryId: null,
                searchValue: null,
                categoryPage: 2,
                departmentPage: 1,
                searchPage: 2,
                page: 2
            })
            .silentRun();
    });
});

describe('fetch products category and reducers', () => {
    const action = { resetList: true, departmentId: 1 };
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });
    const response = helper_factory.products
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('fetch products category successfully', () => {
        return expectSaga(fetchProductsDepartmentSaga)
            .withReducer(ProductsStore)
            .provide([
                [matchers.call.fn(productsApiHelper.fetchProductsDepartmentApi, action),
                response]
            ])
            .put({
                type: 'FETCH_PRODUCTS_DEPARTMENT_RECEIVED',
                response,
                resetList: undefined,
                departmentId: undefined
            })
            .dispatch({
                type: 'FETCH_PRODUCTS_DEPARTMENT'
            })
            .hasFinalState({
                hasError: false,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: helper_factory.products.data.data,
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: false,
                activeCategoryId: null,
                searchValue: null,
                categoryPage: 2,
                departmentPage: 2,
                searchPage: 2,
                page: 2,
                isProductLoading: false,
                fetchProductsDepartment: true,
                activeDepartmentId: undefined
            })
            .silentRun();
    });
    it('fetch products category unsuccesfully', () => {
        return expectSaga(fetchProductsDepartmentSaga)
            .withReducer(ProductsStore)
            .provide([
                [
                    matchers.call.fn(productsApiHelper.fetchProductsDepartmentApi, action),
                    throwError(error)
                ]
            ])
            .put({
                type: 'FETCH_PRODUCTS_DEPARTMENT_FAILED',
                error
            })
            .dispatch({
                type: 'FETCH_PRODUCTS_DEPARTMENT',
            })
            .hasFinalState({
                hasError: true,
                isLoading: false,
                status: null,
                isProductsLoading: true,
                isSaving: false,
                allProducts: [],
                totalProducts: 0,
                totalRecords: 0,
                allCategories: [],
                isCategoriesLoading: true,
                atrributes: [],
                hasMore: true,
                fetchProductsCategory: false,
                fetchProductssearch: false,
                activeCategoryId: null,
                searchValue: null,
                categoryPage: 2,
                departmentPage: 2,
                searchPage: 2,
                page: 2
            })
            .silentRun();
    });
});
