import React from 'react';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {

    componentDidMount() {

    }

    render() { 

        if (this.props.currentUser){
            return (
                <div>
                    <h4>Welcome, {this.props.currentUser.email}</h4>
                    <button onClick={this.props.logOut}>Log out</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to={'/login'}><button>Log in</button></Link>
                    <br/>
                    <Link to={'/signup'}><button>Sign up</button></Link>
                </div>
            )
        };

    }
}

export default Welcome;