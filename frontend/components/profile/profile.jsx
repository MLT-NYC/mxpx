import React from 'react';
import NavBar from '../navbar/navbar';
import PictureItemContainer from '../picture/picture_item_container';
import PictureCarouselContainer from '../picture/picture_carousel_container';
import LikeIndexContainer from '../like/like_index_container';

class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showPictureCarousel: false,
            showLikeIndex: false,
            selectedPictureIndex: null,
            isTop: true,
            top: window.scrollY
        };

        this.openPictureCarousel = this.openPictureCarousel.bind(this);
        this.closePictureCarousel = this.closePictureCarousel.bind(this);
        this.openLikeIndex = this.openLikeIndex.bind(this);
        this.closeLikeIndex = this.closeLikeIndex.bind(this);
    }

    openPictureCarousel(selectedPictureIndex) {
        this.setState({
            showPictureCarousel: true,
            selectedPictureIndex
        });
    }

    closePictureCarousel() {
        this.setState({
            showPictureCarousel: false
        });
    }

    openLikeIndex(selectedPictureIndex) {
        const top = window.scrollY;
        this.setState({
            showLikeIndex: true,
            selectedPictureIndex,
            top
        });
    }

    closeLikeIndex() {
        const top = window.scrollY;
        this.setState({
            showLikeIndex: false,
            top
        });
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 1;
            if (isTop !== this.state.isTop) {
                this.setState({ 
                    isTop
                });
            }
        });

        this.props.fetchPictures(this.props.pictureIds);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.userIds) !== JSON.stringify(this.props.userIds)) {
            this.props.fetchUsers(this.props.userIds);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', () => {
            const isTop = window.scrollY < 1;
            if (isTop !== this.state.isTop) {
                this.setState({ 
                    isTop
                });
            }
        });
    }

    render(){
        let pictures = this.props.pictures.map((picture, index) => {
            return (
                <PictureItemContainer 
                    key={index}
                    picture={picture} 
                    index={index} 
                    openPictureCarousel={this.openPictureCarousel}
                    openLikeIndex={this.openLikeIndex}
                />
            );
        });

        let pictureCarousel;
        if (this.state.showPictureCarousel) {
            pictureCarousel = (
                <PictureCarouselContainer 
                    carouselPictures={this.props.pictures} 
                    currentIndex={this.state.selectedPictureIndex}
                    closePictureCarousel={this.closePictureCarousel}
                />
            );
        }

        let likeIndex;
        let profileContainerClass;
        if (this.state.showLikeIndex) {
            likeIndex = (
                <LikeIndexContainer
                    likerIds={this.props.pictures[this.state.selectedPictureIndex].likerIds}
                    closeLikeIndex={this.closeLikeIndex}
                    top={this.state.top}
                />
            )

            profileContainerClass = 'profileContainer-modal';
        } else {
            profileContainerClass = 'profileContainer';
        }

        return (
            <div className={profileContainerClass}>
                <NavBar currentUser={this.props.currentUser} 
                    navLink={<div className='dropdownMenuItem-9' 
                    onClick={this.props.logOut}>Log out</div>}
                    navBarPicture={this.props.navBarPicture}
                    personalProfile={true}
                    isTop={this.state.isTop}
                />    

                {pictureCarousel}
                {likeIndex}

                <ul className='picturesProfileContainer' style={{top: this.state.top}}>
                    {pictures}
                </ul>
            </div>
        )
    }
}

export default Profile;