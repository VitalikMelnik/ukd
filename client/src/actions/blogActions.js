import {BLOG_LOADING, CHANGE_LIKE, DELETE_BLOG, GET_BLOG, GET_BLOGS, GET_ERRORS} from './types';


import axios from "axios";

export const addBlog = (eduData, history) => dispatch => {
    axios
        .post('/api/blog', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }),
        );
};
// Get Post
export const getPost = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/blog/${id}`)
        .then(res =>
            dispatch({
                type: GET_BLOG,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_BLOG,
                payload: null
            })
        );
};

// Get Posts
export const getBlogs = (page) => dispatch => {
    let config = {params: {page: page},};
    //dispatch(setPostLoading());
    axios
        .get('/api/blog/',config)
        .then(res =>
            dispatch({
                type: GET_BLOGS,
                payload: res.data,
            })
        )
        .catch(err =>
            dispatch({
                type: GET_BLOGS,
                payload: null
            })
        );
};



export const addLike = id => dispatch => {
    axios
        .post(`/api/blog/like/${id}`)
        .then(res =>
            dispatch({
                type: CHANGE_LIKE,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete Post
export const deleteBlog = id => dispatch => {
    axios
        .delete(`/api/blog/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_BLOG,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: BLOG_LOADING
    };
};