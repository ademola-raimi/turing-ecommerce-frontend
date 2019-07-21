import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_RECEIVED,
    FETCH_PRODUCTS_FAILED,
    FETCH_PRODUCT,
    FETCH_PRODUCT_RECEIVED,
    FETCH_PRODUCT_FAILED,
    FETCH_ATTRIBUTES,
    FETCH_ATTRIBUTES_FAILED,
    FETCH_ATTRIBUTES_RECEIVED,
    SEARCH_PRODUCT,
    SEARCH_PRODUCT_FAILED,
    SEARCH_PRODUCT_RECEIVED,
    FETCH_PRODUCTS_CATEGORY,
    FETCH_PRODUCTS_CATEGORY_FAILED,
    FETCH_PRODUCTS_CATEGORY_RECEIVED
} from '../actions/types';

import _ from 'lodash';

const initialState = {
    hasError: false,
    isLoading: true,
    status: null,
    isProductsLoading: true,
    isSaving: false,
    allProducts: [],
    totalProducts: 0,
    sort: {
        orderBy: 'updated_at',
        order: 'desc',
        limit: 20,
        offset: 0,
        page: 0
    },
    totalRecords: 0,
    allCategories: [],
    isCategoriesLoading: true,
    atrributes: []
  }

export default function productReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_PRODUCTS_RECEIVED:
            let totalProducts = action.response.data.total;
            // reset if there is a new search or we need to see the full list again
            if(action.resetList){
                state.allProducts = [];
            }
            // concatenate the array of videos returned to the existing list for infinite scroll
            let allProducts = _.concat(state.allProducts, action.response.data.data);
            newState = Object.assign({}, state, { isLoading: false, isCategoriesLoading: false, allProducts: allProducts, totalProducts: totalProducts });
            return newState;

        case FETCH_PRODUCT_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false, isProductLoading: false, product: action.response.data });
            return newState;

        case SEARCH_PRODUCT_RECEIVED:
            // totalProducts = action.response.data.total;
            // console.log("totalProducts: ",totalProducts)

            // concatenate the array of videos returned to the existing list for infinite scroll
            // allProducts = _.concat(state.allProducts, action.response.data.data);
            // console.log("all products: ",allProducts)
            newState = Object.assign({}, state, { isLoading: false, isProductLoading: false, allProducts: action.response.data.data, totalProducts: action.response.data.total });
            return newState;

        case FETCH_PRODUCTS_CATEGORY_RECEIVED:
            // totalProducts = action.response.data.total;
            // console.log("totalProducts: ",totalProducts)

            // concatenate the array of videos returned to the existing list for infinite scroll
            // allProducts = _.concat(state.allProducts, action.response.data.data);
            // console.log("all products: ",allProducts)
            newState = Object.assign({}, state, { isLoading: false, isProductLoading: false, allProducts: action.response.data.data, totalProducts: action.response.data.total });
            return newState;

        case FETCH_ATTRIBUTES_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false, atrributes: action.response.data });
            return newState;

        case FETCH_PRODUCTS_CATEGORY:
        case FETCH_ATTRIBUTES:
        case FETCH_PRODUCT:
        case FETCH_PRODUCTS:
            return state;

        case FETCH_PRODUCTS_CATEGORY_FAILED:
        case SEARCH_PRODUCT_FAILED:
        case FETCH_ATTRIBUTES_FAILED:
        case FETCH_PRODUCT_FAILED:
        case FETCH_PRODUCTS_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        default:
            return state;
    }
}
