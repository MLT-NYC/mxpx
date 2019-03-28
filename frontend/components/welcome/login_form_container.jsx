import { connect } from 'react-redux';
import SessionForm from './session_form';
import { logIn, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
    let errors = state.errors.session;
    return ({
        errors: errors,
        formType: 'Log in'
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        processForm: user => dispatch(logIn(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);