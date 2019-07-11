import React from 'react';
import LikeIndexItemContainer from './like_index_item_container';

class LikeIndex extends React.Component {
    constructor(props) {
        super(props);


    }

    componentDidMount() {
        if (this.props.likerIds.length > 0) {
            this.props.fetchUsers(this.props.likerIds);
        }
    }

    render() {
        let likersCount = this.props.likersCount;

        let likers = this.props.likerIds.map((likerId, index) => {
            return (
                <LikeIndexItemContainer key={index} likerId={likerId}/>
            );
        });

        return (
            <>
                <div className='likesModal' 
                    onClick={() => this.props.closeLikeIndex()}>
                </div>
                <div className='likesContainer' style={{zIndex: this.props.zIndex}}>
                    <div className='likesHeader'>
                        <div className='likesHeader-title-container'>
                            <div className='likesHeader-title'>Likes</div>
                            <li className='likesHeader-counter'>
                                <span className='likesHeader-counter-span'>
                                    {likersCount}
                                </span>
                            </li>
                        </div>

                        <div className='likesCloseButton' onClick={() => this.props.closeLikeIndex()}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>

                    <div className='likeIndexItems'>
                        {likers}
                    </div>

                </div>
            </>
        )
    }
}

export default LikeIndex;