import { combineReducers } from 'redux';
import { posts, itemsHasErrored, itemsIsLoading, singlepost, itemsSingleIsLoading } from './posts';
export default combineReducers({
    posts,
    itemsHasErrored,
    itemsIsLoading,
    singlepost,
    itemsSingleIsLoading
});