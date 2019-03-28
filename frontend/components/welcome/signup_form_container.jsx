import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signUp, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
    let errors = state.errors.session;
    return ({
        errors: errors,
        formType: 'Sign up'
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        processForm: user => dispatch(signUp(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);