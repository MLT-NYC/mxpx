import React from 'react';

class PictureCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: props.currentIndex
        };

        this.toggleLeft = this.toggleLeft.bind(this);
        this.toggleRight = this.toggleRight.bind(this);
    }

    toggleLeft() {
        let leftIndex = this.state.currentIndex;
        leftIndex -= 1;

        this.setState({
            currentIndex: leftIndex
        });
    }

    toggleRight() {
        let rightIndex = this.state.currentIndex;
        rightIndex += 1;

        this.setState({
            currentIndex: rightIndex
        });
    }

    render(){
        let currentPicture = this.props.carouselPictures[this.state.currentIndex];
        let currentPhotographer = this.props.allUsers[currentPicture.photographer_id];
        let currentPhotographerProfilePic = this.props.allPictures[currentPhotographer.profile_picture_id];
       
        let photographerName;
        if (currentPhotographer.first_name) {
            photographerName = currentPhotographer.first_name + ' ' + currentPhotographer.last_name;
        } else {
            photographerName = currentPhotographer.email;
        }
       
        return (
            <>
                <div className='pictureCarousel-top'>

                    <div className='pictureCarousel-top-left'>
                        <div className='pictureCarousel-close' onClick={() => this.props.closePictureCarousel()}>CLOSE ICON</div>
                        <div className='pictureCarousel-navLeft' onClick={() => this.toggleLeft()}>Left</div>
                    </div>

                    <div className='pictureCarousel-display'>
                        <img src={currentPicture.img_url}/>
                    </div>

                    <div className='pictureCarousel-navRight' onClick={this.toggleRight}>Right</div>
                </div>

                <div className='pictureCarousel-bottom'>
                    <div className='pictureDetails'>
                        <div className='pictureDetails-likes'>
                            {/* Clickable Like Icon Goes Here */}
                            {/* Likers/Followers Component Goes Here */}
                        </div>

                        <div className='pictureDetails-authorship'>
                            <div className='pictureDetails-authorship-left'>
                                <div className='pictureDetails-authorship-title'>{currentPicture.title}</div>
                                <div className='pictureDetails-authorship-photographer'>by {photographerName}</div>
                            </div>

                            <div className='pictureDetails-authorship-right'>
                                <img src={currentPhotographerProfilePic.img_url}/>
                            </div>
                        </div>

                        <div className='pictureDetails-description'>
                            {currentPicture.description}
                        </div>
                    </div>

                    {/* Comment Component Goes Here */}
                </div>
            </>
        )
    }
}

export default PictureCarousel;