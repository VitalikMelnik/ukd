import {GET_DRIVE, GET_ERRORS, CLEAR_CURRENT_DRIVE, DRIVE_LOADING, UPDATE_DRIVE} from './types';
import axios from "axios";


// Get current drive
export const getCurrentDrive = () => dispatch => {
    dispatch(setDriveLoading());
    axios
        .get('/api/drive')
        .then(res =>
            dispatch({
                type: GET_DRIVE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_DRIVE,
                payload: {}
            })
        );
};

// Get profile by handle
export const getDriveByHandle = handle => dispatch => {
    dispatch(setDriveLoading());
    axios
        .get(`/api/drive/handle/${handle}`)
        .then(res =>
            dispatch({
                type: GET_DRIVE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_DRIVE,
                payload: {}
            })
        );
};
// Create Drive
export const createDrive = (profileData, history) => dispatch => {
    axios
        .post('/api/drive', profileData)
        .then(res => history.push('/drive'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const saveDrive = (driveData) => dispatch => {
    axios
        .post('/api/drive/save', driveData)
        .then(res =>
            dispatch({
                type: UPDATE_DRIVE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }),
        );
};


// Profile loading
export const setDriveLoading = () => {
    return {
        type: DRIVE_LOADING
    };
};

// Clear profile
export const clearCurrentDrive = () => {
    return {
        type: CLEAR_CURRENT_DRIVE
    };
};


// // Get Post
// export const getDrive = id => dispatch => {
//     dispatch(setPostLoading());
//     axios
//         .get(`/api/drive/${id}`)
//         .then(res =>
//             dispatch({
//                 type: GET_DRIVE,
//                 payload: res.data
//             })
//         )
//         .catch(err =>
//             dispatch({
//                 type: GET_DRIVE,
//                 payload: null
//             })
//         );
// };