export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function itemsSingleIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_SINGLE_IS_LOADING':
            return action.isSingleLoading;
        default:
            return state;
    }
}

export function posts(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.posts;
        default:
            return state;
    }
}

export function singlepost(state = {}, action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SINGLE':
            return action.singlepost;
        default:
            return state;
    }
}

