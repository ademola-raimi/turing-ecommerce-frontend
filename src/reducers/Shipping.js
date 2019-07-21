import {
    FETCH_SHIPPING_REGION_FAILED,
    FETCH_SHIPPING_REGION,
    FETCH_SHIPPING_REGION_RECEIVED,
    FETCH_SHIPPING_REGION_PRICE_RECEIVED,
    FETCH_SHIPPING_REGION_PRICE,
    FETCH_SHIPPING_REGION_PRICE_FAILED
} from '../actions/types';

const initialState = {
    isLoading: false,
    hasError: false,
    shippingRegions: [],
    shippingInfo: []
};

export default function ShippingReducer (state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_SHIPPING_REGION_RECEIVED:
            newState = Object.assign({}, state, { shippingRegions: action.response.data });
            return newState;

        case FETCH_SHIPPING_REGION_PRICE_RECEIVED:
            newState = Object.assign({}, state, { shippingInfo: action.response.data });
            return newState;

        case FETCH_SHIPPING_REGION_PRICE_FAILED:
        case FETCH_SHIPPING_REGION_FAILED:
            newState = Object.assign({}, state, { hasError: true});
            return newState;
        default:
            return state;
    }
}
