import React from 'react'
import PictureItemContainer from "./picture_item_container";
import PictureCarouselContainer from "./picture_carousel_container";
import LikeIndexContainer from "../like/like_index_container";
import NavBar from "../navbar/navbar";

class PictureDiscover extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // pictures: props.pictures,
            // per: 10,
            // page: 1,
            totalPages: null,
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

    // loadMorePictures = () => {
    //     const { per, page, pictures }  = this.state;
    // };
    //
    // handleScroll = () => {
    //     const lastDiv = document.querySelector("ul.container > div:last-child");
    //     const lastLiOffset = lastDiv.offsetTop + lastDiv.clientHeight;
    //     const pageOffset = window.pageYOffset + window.innerHeight;
    //     if (pageOffset > lastLiOffset) {
    //         this.loadMorePictures();
    //     }
    // };

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 1;
            if (isTop !== this.state.isTop) {
                this.setState({
                    isTop
                });
                // this.handleScroll()
            }


        });

        this.props.fetchUsers(this.props.userIds)
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.pictureIds) !== JSON.stringify(this.props.pictureIds)) {
            this.props.fetchPictures(this.props.pictureIds);
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
        // //LATER
        // // On component did mount,
        // // The component will call to the back end to retrieve 30 pics.
        // // The backend will return a combination of the most recent pics
        // // of the user's followers/followeers (that have not been liked by the user)
        // // AND 10 most recent pics from non-follower/non-followees.
        // // After scrolling to the bottom, the component will render the next 10 most recent.

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
        let likeIndex;
        let profileContainerClass;
        if (this.state.showPictureCarousel) {
            pictureCarousel = (
                <PictureCarouselContainer
                    carouselPictures={this.props.pictures}
                    currentIndex={this.state.selectedPictureIndex}
                    closePictureCarousel={this.closePictureCarousel}
                />
            );

            profileContainerClass = 'profileContainer-modal';
        } else if (this.state.showLikeIndex) {
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

export default PictureDiscover;
