import {
    RECEIVE_PICTURE,
    RECEIVE_PICTURE_ERRORS,
    CLEAR_PICTURE_ERRORS
} from '../actions/pictures_actions';

const pictureErrorsReducer = (oldState = [], action) => {
    Object.freeze(oldState);

    switch(action.type){
        case RECEIVE_PICTURE_ERRORS:
        debugger
            return action.errors.responseJSON;
        case RECEIVE_PICTURE:
            return [];
        case CLEAR_PICTURE_ERRORS:
            return [];
        default:
            return oldState;
    }
};

export default pictureErrorsReducer;