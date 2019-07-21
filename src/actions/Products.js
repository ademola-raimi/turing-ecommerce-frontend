import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT,
    FETCH_ATTRIBUTES,
    SEARCH_PRODUCT,
    FETCH_PRODUCTS_CATEGORY
} from '../actions/types';

export const fetchProducts = (
    limit,
    sort,
    search_term,
    resetList
) => ({
    type: FETCH_PRODUCTS,
    limit,
    sort,
    search_term,
    resetList,
});

export const fetchAttributes = (productId) => ({
    type: FETCH_ATTRIBUTES,
    productId
});

export const fetchProduct = (productId) => ({
    type: FETCH_PRODUCT,
    productId
});

export const searchProducts = (searchValue) => ({
    type: SEARCH_PRODUCT,
    searchValue
})

export const fetchProductsCategory = (categoryId) => ({
    type: FETCH_PRODUCTS_CATEGORY,
    categoryId
})

