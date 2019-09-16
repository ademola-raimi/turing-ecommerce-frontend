import {
    FETCH_DEPARTMENTS,
    FETCH_DEPARTMENTS_RECEIVED,
    FETCH_DEPARTMENTS_FAILED
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
    allDepartments: [],
    isDepartmentsLoading: true,
  }

export default function departmentReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_DEPARTMENTS_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false, allDepartments: action.response.data });
            return newState;

        case FETCH_DEPARTMENTS:
            newState = Object.assign({}, state, { isLoading:  true });
            return newState;

        case FETCH_DEPARTMENTS_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        default:
            return state;
    }
}
