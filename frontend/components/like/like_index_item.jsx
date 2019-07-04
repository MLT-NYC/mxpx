import React from 'react';


class LikeIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            follower_id: props.currentUserId,
            followee_id: props.likerId
        };

        this.followUser = this.followUser.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
    }

    followUser() {
        let { follower_id, followee_id } = this.state;
        let follow = { follower_id, followee_id };

        this.props.createFollow(follow);
    }

    unfollowUser() {
        let { follower_id, followee_id } = this.state;
        let follow = { follower_id, followee_id };

        this.props.deleteFollow(follow);
    }

    componentDidMount() {
        if (this.props.likerProfilePicId) {
            this.props.fetchPicture(this.props.likerProfilePicId);
        }
    }

    render() {
        let toggleFollowButton;
        if (this.props.currentUser.followeeIds.includes(this.props.likerId)) {
            toggleFollowButton = (
                <div className='likesIndexItem-unfollowButton' onClick={this.unfollowUser}>Unfollow</div>
            )
        } else {
            toggleFollowButton = (
                <div className='likesIndexItem-followButton' onClick={this.followUser}>Follow</div>
            )
        }

        return (
            <li className='likesIndexItem'>
                <div className='likesIndexItem-left'>
                    <img src={this.props.likerProfilePicImgUrl}/>
                    <div className='likesIndexItem-likerInfo'>
                        <div className='likesIndexItem-likerName'>{this.props.likerName}</div>
                        <div className='likesIndexItem-likersFollowCount'>{this.props.likersFollowCount} Followers</div>
                    </div>
                </div>

                {toggleFollowButton}
            </li>
        )
    }
}

export default LikeIndexItem;