import * as PictureApiUtils from '../util/pictures_api_util';

export const RECEIVE_ALL_PICTURES = 'RECEIVE_ALL_PICTURES';
export const RECEIVE_PICTURE = 'RECEIVE_PICTURE';
export const REMOVE_PICTURE = 'REMOVE_PICTURE';
export const RECEIVE_PICTURE_ERRORS = 'RECEIVE_PICTURE_ERRORS';
export const CLEAR_PICTURE_ERRORS = 'CLEAR_PICTURE_ERRORS';

const receivePictures = pictures => ({
    type: RECEIVE_ALL_PICTURES,
    pictures: pictures
});

const receivePicture = picture => ({
    type: RECEIVE_PICTURE,
    picture: picture
});

const removePicture = picture => ({
    type: REMOVE_PICTURE,
    picture: picture
});

const receivePictureErrors = (errors) => ({
    type: RECEIVE_PICTURE_ERRORS,
    errors: errors
});

export const clearPictureErrors = () => ({
    type: CLEAR_PICTURE_ERRORS,
});

export const fetchPictures = pictureIds => dispatch => {
    return PictureApiUtils.fetchPictures(pictureIds)
        .then(pictures => dispatch(receivePictures(pictures)));
};

export const fetchPicture = (id) => dispatch => {
    return PictureApiUtils.fetchPicture(id)
        .then(picture => dispatch(receivePicture(picture)));
};

export const createPicture = (picture) => dispatch => {
    return PictureApiUtils.createPicture(picture)
        .then(picture => dispatch(receivePicture(picture)),
        errors => dispatch(receivePictureErrors(errors)));
};

export const updatePicture = (picture) => dispatch => {
    return PictureApiUtils.updatePicture(picture)
        .then(picture => dispatch(receivePicture(picture)),
            errors => dispatch(receivePictureErrors(errors)));
};

export const deletePicture = (picture) => dispatch => {
    return PictureApiUtils.deletePicture(picture)
        .then(picture => dispatch(removePicture(picture)));
};
