import { combineReducers } from 'redux';

import posts from './postsReducer';
import auth from './authReducer';

export default combineReducers({
    posts, auth
})