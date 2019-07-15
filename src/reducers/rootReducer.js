import { combineReducers } from 'redux';
import { default as ProductStore } from './Products';
import { default as CategoryStore } from './categories';
// import { default as NotificationStore } from './notificationReducer';
// import { default as LivestreamStore } from './livestreamReducer';
// import { default as ScheduleStore } from './scheduleReducer';
// import { default as AdtagStore } from './adtagReducer';

import { RESET } from '../actions/types';

const appReducer = combineReducers({
    ProductStore,
    CategoryStore,
    // NotificationStore,
    // LivestreamStore,
    // ScheduleStore,
    // AdtagStore
});

const rootReducer = (state, action) => {
    if (action.type === RESET) {
        state = undefined;
    }
    return appReducer(state, action);
};
export default rootReducer;
