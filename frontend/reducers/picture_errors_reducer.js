import {
    RECEIVE_PICTURE,
    RECEIVE_PICTURE_ERRORS,
    CLEAR_PICTURE_ERRORS
} from '../actions/pictures_actions';

const pictureErrorsReducer = (oldState = [], action) => {
    Object.freeze(oldState);

    let newState;
    switch(action.type){
        case RECEIVE_PICTURE_ERRORS:
            // debugger
            if (action.errors.responseJSON) {
                newState = action.errors.responseJSON;
            } else if (action.errors.responseText) {
                newState = action.errors.responseText;
            }
            return newState;
        case RECEIVE_PICTURE:
            return [];
        case CLEAR_PICTURE_ERRORS:
            return [];
        default:
            return oldState;
    }
};

export default pictureErrorsReducer;