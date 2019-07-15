import {
    CLEAR_NOTIFICATION,
    SHOW_NOTIFICATION
} from '../actions/types';

export const closeNotification = () => ({
    type: CLEAR_NOTIFICATION
});

export const showLivestreamNotification = () => ({
    type: SHOW_NOTIFICATION
});