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
        let leftIndex = this.state.currentIndex =- 1;

        this.setState({
            currentIndex: leftIndex
        });
    }

    toggleRight() {
        let rightIndex = this.state.currentIndex =+ 1;

        this.setState({
            currentIndex: rightIndex
        });
    }

    render(){
        let currentPicture = this.props.pictures[this.state.currentIndex];

        return (
            <>
                <div className='pictureCarousel-top'>
                    <div className='pictureCarousel-navLeft' onClick={this.toggleLeft}>

                    </div>

                    <div className='pictureCarousel-display'>
                        <img src={currentPicture.img_url}/>
                    </div>

                    <div className='pictureCarousel-navRight' onClick={this.toggleRight}>

                    </div>
                </div>

                <div className='pictureCarousel-bottom'>
                    <div className='pictureDetails'>
                        <div className='pictureDetails-likes'>

                        </div>

                        <div className='pictureDetails-authorship'>

                        </div>

                        <div className='pictureDetails-description'>

                        </div>
                    </div>

                    {/* Comment Component Goes Here */}
                </div>
            </>
        )
    }
}

export default PictureCarousel;