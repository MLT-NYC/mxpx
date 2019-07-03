import React from 'react';

class LikeIndex extends React.Component {
    constructor(props) {

    }

    componentDidMount() {
        this.props.fetchUsers(this.props.likerIds);
    }

    render() {
        let likersCount = this.props.likersCount;

        // let likers = this.props.likerIds.forEach(likerId)

        return (
            <div className='likesContainer'>
                <div className='likesHeader'>
                    <div className='likesHeader-title-container'>
                        <div className='likesHeader-title'>Likes</div>
                        <li className='likesHeader-counter'>{likersCount}</li>
                    </div>

                    <div className='likesCloseButton'>CLOSE LIKES</div>
                </div>

                <div className='likesIndex'>
                    {/* mapped likes index items go here */}
                </div>

            </div>
        )
    }
}

export default LikeIndex;