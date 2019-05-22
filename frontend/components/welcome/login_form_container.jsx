import { connect } from 'react-redux';
import SessionForm from './session_form';
import { logIn, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = state => {
    let errors = state.errors.sessionErrors;
    return ({
        demoUser: state,
        errors: errors,
        formType: 'Log in'
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        processForm: user => dispatch(logIn(user)),
        logInDemo: () => dispatch(logIn({password: 'demopassword', email: "demo@demo.com"})),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);