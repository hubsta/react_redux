
export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}
export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsSingleIsLoading(bool) {
    return {
        type: 'ITEMS_SINGLE_IS_LOADING',
        isSingleLoading: bool
    };
}

export function itemsFetchDataSuccess(posts) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        posts
    };
}

export function itemsSingle(singlepost) {
    return {
        type: 'ITEMS_FETCH_DATA_SINGLE',
        singlepost
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((posts) => dispatch(itemsFetchDataSuccess(posts)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function itemsSingleFetchData(data) {
    return(dispatch) => dispatch(itemsSingle(data));
}
