import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signUp, clearSessionErrors, logIn } from '../../actions/session_actions';

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
        logInDemo: () => dispatch(logIn({ password: 'demopassword', email: "demo@demo.com" })),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);