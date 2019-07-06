import React from 'react';
import NavBar from '../navbar/navbar';
import PictureItemContainer from '../picture/picture_item_container';
import PictureCarouselContainer from '../picture/picture_carousel_container';

class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showPictureCarousel: false,
            selectedPictureIndex: null,
            isTop: true,
        };

        this.openPictureCarousel = this.openPictureCarousel.bind(this);
        this.closePictureCarousel = this.closePictureCarousel.bind(this);
    }

    openPictureCarousel(selectedPictureIndex) {
        this.setState({
            showPictureCarousel: true,
            selectedPictureIndex: selectedPictureIndex
        });
    }

    closePictureCarousel() {
        this.setState({
            showPictureCarousel: false
        });
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 1;
            if (isTop !== this.state.isTop) {
                this.setState({ isTop });
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
                this.setState({ isTop });
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

        return (
            <div>
                <NavBar currentUser={this.props.currentUser} 
                    navLink={<div className='dropdownMenuItem-9' 
                    onClick={this.props.logOut}>Log out</div>}
                    navBarPicture={this.props.navBarPicture}
                    personalProfile={true}
                    isTop={this.state.isTop}
                />    

                {pictureCarousel}

                <ul className='picturesProfileContainer'>
                    {pictures}
                </ul>
            </div>
        )
    }
}

export default Profile;