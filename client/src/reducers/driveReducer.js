import {GET_DRIVE, DRIVE_LOADING, CLEAR_CURRENT_DRIVE,UPDATE_DRIVE} from '../actions/types';


const initialState = {
    drive: null,
    loading: false,
    change:false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case DRIVE_LOADING:
            return {
                ...state,
                loading: true
            };
        case UPDATE_DRIVE:
            return {
                ...state,
                drive: action.payload,
                change: false
            };
        case GET_DRIVE:
            return {
                ...state,
                drive: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_DRIVE:
            return {
                ...state,
                drive: {}
            };
        default:
            return state;
    }
}
