import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import pictureErrorsReducer from './picture_errors_reducer';

const errorsReducer = combineReducers({
    sessionErrors: sessionErrorsReducer,
    pictureErrors: pictureErrorsReducer
});

export default errorsReducer;