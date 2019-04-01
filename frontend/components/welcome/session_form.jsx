import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../navbar/navbar';
import ErrorMessage from '../notification/error_message';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    demoSubmit(e) {
        e.preventDefault();

        
    }

    update(field){
        return e => this.setState({
            [field]: e.target.value
        });
    }

    componentDidMount(){
        this.props.clearSessionErrors();
    }
    
    render() {
        let formHeading;
        let navLink;

        if (this.props.formType === 'Sign up') {
            formHeading = 'Join mxpx';
            navLink = <Link to={'/login'} className='sessionLogInButton'>Log in</Link>;
        } else if (this.props.formType === 'Log in') {
            formHeading = 'Log in to mxpx';
            navLink = <Link to={'/signup'} className='sessionSignUpButton'>Sign up</Link>;
        }

        let sessionTitleClass;
        let sessionInputClass;
        if (this.props.errors.length === 0) {
            sessionTitleClass = 'sessionTitle';
            sessionInputClass = 'sessionInput';
        } else {
            sessionTitleClass = 'sessionTitle-error';
            sessionInputClass = 'sessionInput-error';
        }

        return (
            <>
                <div className='sessionFormPage'>

                    <div className='sessionErrorContainer'>
                        <ErrorMessage className='session-error' errors={this.props.errors} />   
                    </div>
                
                    <NavBar navLink={navLink}/>

                    <div className='sessionFormBox'>
                        <form className='sessionForm' onSubmit={this.handleSubmit}>
                            <h3 className='sessionFormHeading'>
                                {formHeading}
                            </h3>

                            <h5 className={sessionTitleClass}>Email</h5>
                            <input className={sessionInputClass} type="text" value={this.state.email} onChange={this.update('email')} />

                            <h5 className={sessionTitleClass}>Password</h5>
                            <input className={sessionInputClass} type="password" value={this.state.password} onChange={this.update('password')} />
                            <br/>
                            <input className='sessionSubmit' type="submit" value={this.props.formType} />
                            <div className='sessionDemoLogIn' onClick={this.props.logInDemo}>Demo Log In
                            </div>
                        </form>
                    </div>

            
                </div>
            </>
        );

    }
}

export default SessionForm;