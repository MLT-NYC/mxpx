import React from 'react';

class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render (){
    
        return (
            <ul>
                {this.props.errors}
            </ul>
        )
    }
}

export default ErrorMessage;