import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT,
    FETCH_ATTRIBUTES,
    SEARCH_PRODUCT,
    FETCH_PRODUCTS_CATEGORY,
    FETCH_PRODUCTS_DEPARTMENT
} from '../actions/types';

export const fetchProducts = (resetList, page) => ({
    type: FETCH_PRODUCTS,
    resetList,
    page
});

export const fetchAttributes = (productId) => ({
    type: FETCH_ATTRIBUTES,
    productId
});

export const fetchProduct = (productId) => ({
    type: FETCH_PRODUCT,
    productId
});

export const searchProducts = (resetList, searchValue, page) => ({
    type: SEARCH_PRODUCT,
    searchValue,
    resetList,
    page
})

export const fetchProductsCategory = (resetList, categoryId, page) => ({
    type: FETCH_PRODUCTS_CATEGORY,
    resetList,
    categoryId,
    page
})

export const fetchProductsDepartment = (resetList, departmentId, page) => ({
    type: FETCH_PRODUCTS_DEPARTMENT,
    resetList,
    departmentId,
    page
})