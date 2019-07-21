import {
    FETCH_SHIPPING_REGION,
    FETCH_SHIPPING_REGION_PRICE
} from '../actions/types';

export const fetchShippingRegions = () => ({
    type: FETCH_SHIPPING_REGION,
});

export const shippingPrice = (shippingRegionId) => ({
    type: FETCH_SHIPPING_REGION_PRICE,
    shippingRegionId
});


