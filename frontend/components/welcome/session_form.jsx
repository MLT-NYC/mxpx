import React from 'react';
import { Link } from 'react-router-dom';

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

    update(field){
        return e => this.setState({
            [field]: e.target.value
        });
    }

    componentDidMount(){
        this.props.clearSessionErrors();
    }
    
    render() {

        // if (this.props.errors.length > 0){
        //     let errors = this.props.errors.map( (error, idx) => {

        //     });
        // }

        return (
            <div>
                <h4>{this.props.formType}</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.email} onChange={this.update('email')} />
                    <h5>Email</h5>
                    <input type="password" value={this.state.password} onChange={this.update('password')} />
                    <h5>Password</h5>
                    <input type="submit" value="Submit" />
                </form>
                <ul>
                    {this.props.errors}
                </ul>
                
            </div>
        );

    }
}

export default SessionForm;