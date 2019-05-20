import React from 'react';

class PersonalCoverEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };


    }

    render() {

        return (
            <div className='personalCoverEditModal'>
                <div className='personalCoverEditModal-top'>
                    <input type="file" />
                </div>

                <div className='personalCoverEditModal-bottom'>

                </div>
            </div>

        );
    }
}

export default PersonalCoverEdit;