import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_RECEIVED,
    FETCH_CATEGORIES_FAILED
} from '../actions/types';

const initialState = {
    hasError: false,
    isLoading: true,
    status: null,
    isSaving: false,
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
  }

export default function categoryReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_CATEGORIES_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false, allCategories: action.response.data.data });
            return newState;

        case FETCH_CATEGORIES:
            newState = Object.assign({}, state, { isLoading:  true });
            return newState;

        case FETCH_CATEGORIES_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        default:
            return state;
    }
}
