import {
    FETCH_COLOR_ATTRIBUTES,
    FETCH_SIZE_ATTRIBUTES
} from '../actions/types';

export const fetchAttributesSize = () => ({
    type: FETCH_SIZE_ATTRIBUTES,
});

export const fetchAttributesColor = () => ({
    type: FETCH_COLOR_ATTRIBUTES,
});
