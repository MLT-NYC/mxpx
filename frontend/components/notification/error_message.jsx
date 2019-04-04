import React from 'react';

class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {showErrors: false};
    }

    componentDidUpdate(oldProps) {
        if (oldProps.errors != this.props.errors) {
            this.setState({showErrors: true});
        }
    }

    render (){
        let style = {};
        if (this.props.errors.length > 0 && this.state.showErrors) {
            style = {top: '0'};
        }

        let errors = this.props.errors;

        if (errors.length > 1){
            errors = errors.map((error, idx) => {
                return <li key={idx} className='multipleErrors'>{error}</li>
            })
        }

        return (
            <div className='errorContainer' style={style}>
                <ul className='errorMessage'>
                    {errors}
                </ul>
                <div className='closeError' onClick={()=> this.setState({showErrors: false})}>
                    x
                </div>
            </div>

        )
    }
}

export default ErrorMessage;