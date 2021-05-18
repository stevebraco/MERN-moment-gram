import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../constants/postsConstants";

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;

        case CREATE:
            return [...posts, action.payload];
        
        case UPDATE:
            // if the current id is equal to the new id update ? return action.payload so if we have no update, the current id
            return posts.map((post) => post._id === action.payload._id ? action.payload : post );

        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post );
    
        default:
            return posts;
    }
    }
