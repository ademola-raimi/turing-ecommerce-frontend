import {
    FETCH_COLOR_ATTRIBUTES,
    ATTRIBUTES_COLOR_RECEIVED,
    ATTRIBUTES_COLOR_FAILED,
    FETCH_SIZE_ATTRIBUTES,
    ATTRIBUTES_SIZE_RECEIVED,
    ATTRIBUTES_SIZE_FAILED
} from '../actions/types';

const initialState = {
    hasError: false,
    colorIsLoading: true,
    sizeIsLoading: true,
    sizeAttributes: [],
    colorAttributes: []
  }

export default function AttributesReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case ATTRIBUTES_COLOR_RECEIVED:
            // console.log("color: ",action.response.data)
            newState = Object.assign({}, state, { colorIsLoading: false, colorAttributes: action.response.data });
            return newState;

        case ATTRIBUTES_SIZE_RECEIVED:
            // console.log("size: ", action.response.data)
            newState = Object.assign({}, state, { sizeIsLoading: false, sizeAttributes: action.response.data });
            return newState;

        case FETCH_COLOR_ATTRIBUTES:
        newState = Object.assign({}, state, { colorIsLoading:  true });
            return state;

        case FETCH_SIZE_ATTRIBUTES:
            newState = Object.assign({}, state, { sizeIsLoading:  true });
            return state;

        case ATTRIBUTES_SIZE_FAILED:
        newState = Object.assign({}, state, { sizeIsLoading:  false, hasError: true });
            return newState;

        case ATTRIBUTES_COLOR_FAILED:
            newState = Object.assign({}, state, { colorIsLoading:  false, hasError: true });
            return newState;

        default:
            return state;
    }
}
