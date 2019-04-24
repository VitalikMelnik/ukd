import {ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_LOADING, CHANGE_LIKE_POST} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false,
    load_more: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_POSTS:
            const posts = state.posts.filter(post => !action.payload.some(newElement => newElement._id === post._id));
            return {
                ...state,
                posts: posts.concat(action.payload),
                load_more: 8 <= action.payload.length,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case CHANGE_LIKE_POST:
            return {
                ...state,
                post: action.payload,
                posts:
                    state.posts.map(item => {
                        if (item._id !== action.payload._id) return item;
                        return Object.assign({}, item, {likes: action.payload.likes});
                    })
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        default:
            return state;
    }
}
