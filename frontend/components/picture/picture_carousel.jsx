import React from 'react';

class PictureCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            class: props.class,
            imgUrl: props.imgUrl,
            currentIndex: props.currentIndex
        };

    }

    render(){
        return (
            <>
                <div className='pictureCarousel-top'>
                    <div className='pictureCarousel-navLeft'>

                    </div>

                    <div className='pictureCarousel-display'>

                    </div>

                    <div className='pictureCarousel-navRight'>

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