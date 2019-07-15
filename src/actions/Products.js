import {
    FETCH_PRODUCTS,
    FETCH_CATEGORIES,
    FETCH_PRODUCT
} from '../actions/types';

// export const fetchAllSegments = (search_term, limit, offset, order, orderBy, page) => ({
//     type: FETCH_SEGMENTS,
//     search_term,
//     limit,
//     offset,
//     order,
//     orderBy,
//     page
// });

// export const bulkDeleteSegments = (segmentIds) => ({
//     type: BULK_DELETE_SEGMENTS,
//     segmentIds
// })

export const fetchProducts = (
    limit,
    sort,
    search_term,
    resetList
) => ({
    type: FETCH_PRODUCTS,
    limit,
    sort,
    search_term,
    resetList,
});

export const fetchCategories = () => ({
    type: FETCH_CATEGORIES,
});

export const fetchProduct = (productId) => ({
    type: FETCH_PRODUCT,
    productId
});

// export const saveSegment = (name, content, bumper) => ({
//     type: SAVE_SEGMENT,
//     content_type: [MEDIA_VID_TYPE],
//     name,
//     content,
//     bumper,
// });

// export const editSegment = (segmentId, name, content, bumper) => ({
//     type: EDIT_SEGMENT,
//     content_type: [MEDIA_VID_TYPE],
//     segmentId,
//     name,
//     content,
//     bumper,
// });

// export const fetchSegment = (segmentId) => ({
//     type: FETCH_SEGMENT,
//     content_type: [MEDIA_VID_TYPE],
//     segmentId,
// });

// export const deleteSegment = (segmentId) => ({
//     type: DELETE_SEGMENT,
//     segmentId,
// });

// export const resetActiveSegment = () => ({
//     type: RESET,
// });

// export const fetchAllAds = () => ({
//     type: FETCH_ADS,
//     content_type: MEDIA_AD_TAGS_TYPE,
// });

// export const fetchAllBumpers = () => ({
//     type: FETCH_BUMPERS,
//     content_type: MEDIA_BUMPER_TYPE,
// });

// export const fetchAllProducers = () => ({
//     type: FETCH_PRODUCERS,
// });

// export const dispatchValidationError = () => ({
//     type: SEGMENT_VALIDATION_ERROR
// });

// export const dispatchFetchSegmentError = () => ({
//     type: FETCH_SEGMENT_FAILED
// });

// export const dispatchMaxTimeError = () => ({
//     type: SEGMENT_MAX_TIME_ERROR
// })

// export const getSegmentStatus = (segmentId) => ({
//     type: FETCH_SEGMENT_STATUS,
//     segmentId
// })

// export const setLoadingToFalse = () => ({
//     type: SET_LOADING_TO_FALSE
// })
