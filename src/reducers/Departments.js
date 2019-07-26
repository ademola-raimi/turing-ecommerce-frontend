import {
    FETCH_DEPARTMENTS,
    FETCH_DEPARTMENTS_RECEIVED,
    FETCH_DEPARTMENTS_FAILED
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
    allDepartments: [],
    isDepartmentsLoading: true,
  }

export default function departmentReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_DEPARTMENTS_RECEIVED:
            // reset if there is a new search or we need to see the full list again
            if(action.resetList){
                state.allDepartments = [];
            }
            // concatenate the array of videos returned to the existing list for infinite scroll
            const allDepartments = _.concat(state.allDepartments, action.response.data);
            newState = Object.assign({}, state, { isLoading: false, allDepartments: allDepartments });
            return newState;

        case FETCH_DEPARTMENTS:
            return state;

        case FETCH_DEPARTMENTS_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        default:
            return state;
    }
}
