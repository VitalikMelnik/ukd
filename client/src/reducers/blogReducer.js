import {ADD_BLOG, BLOG_LOADING, CHANGE_LIKE, DELETE_BLOG, GET_BLOG, GET_BLOGS} from '../actions/types';


const initialState = {
    blogs: [],
    blog: {},
    span: false,
    span_body: {},
    loading: false,
    load_more: true,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case BLOG_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_BLOGS:
            const blogs = state.blogs.filter(blog => !action.payload.some(newBook => newBook._id === blog._id));
            return {
                ...state,
                blogs: blogs.concat(action.payload),
                load_more: 8 <= action.payload.length,
                loading: false,
            };
        case GET_BLOG:
            return {
                ...state,
                blog: action.payload,
                loading: false
            };
        case  ADD_BLOG :
            return {
                ...state,
                blogs: [action.payload, ...state.blogs],

            };
        case CHANGE_LIKE:
            return {
                ...state,
                blog: action.payload,
                blogs:
                    state.blogs.map(item => {
                        if (item._id !== action.payload._id) return item;
                        return Object.assign({}, item, {likes: action.payload.likes});
                    })
            };
        case DELETE_BLOG:

            return {
                ...state,
                blogs: state.blogs.filter(blog => blog._id !== action.payload)
            };
        default:
            return state;
    }
}
