import {
    RECEIVE_ALL_PICTURES,
    RECEIVE_PICTURE,
    REMOVE_PICTURE
} from '../actions/pictures_actions';
import merge from 'lodash/merge';

const picturesReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState;
    switch (action.type) {
        case RECEIVE_ALL_PICTURES:
            newState = merge({}, oldState);
            action.pictures.forEach((picture) => {
                newState[picture.id] = picture;
            });
            return newState;
        case RECEIVE_PICTURE:
            newState = merge({}, oldState, {[action.picture.id]: action.picture});
            return newState;
        case REMOVE_PICTURE:
            newState = merge({}, oldState);
            delete newState[action.picture.id];
            return newState;
        default:
            return oldState;
    }
}

export default picturesReducer;