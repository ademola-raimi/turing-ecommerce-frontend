import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_RECEIVED,
    FETCH_CATEGORIES_FAILED
} from '../actions/types';

import _ from 'lodash';

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
            const totalCategories = action.response.data.total;
            // reset if there is a new search or we need to see the full list again
            if(action.resetList){
                state.allCategories = [];
            }
            // concatenate the array of videos returned to the existing list for infinite scroll
            const allCategories = _.concat(state.allCategories, action.response.data.data);
            newState = Object.assign({}, state, { isLoading: false, allCategories: allCategories, totalCategories: totalCategories });
            return newState;

        case FETCH_CATEGORIES:
            return state;

        case FETCH_CATEGORIES_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        default:
            return state;
    }
}
