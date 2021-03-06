import React from 'react';
import NavBar from '../navbar/navbar';
import PictureFormContainer from '../picture/picture_form_container';
import PictureShowContainer from '../picture/picture_show_container';

class PictureNew extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showForm: true
        };

        this.toggleShowForm = this.toggleShowForm.bind(this);
    }

    toggleShowForm(){
        const { showForm } = this.state;

        this.setState({
            showForm: !showForm
        });
    }

    render(){
        let modal;
        let modalClassName;
        if (this.state.showForm){
            modal = (
                <>
                    <div className='modal' onClick={this.toggleShowForm}>

                    </div>
                    <PictureFormContainer />    
                </>
            );

            modalClassName = 'pictureNewContainer-modal'
        } else {
            modalClassName = 'pictureNewContainer'
        }
        return (
            <div className={modalClassName}>
                <NavBar currentUser={this.props.currentUser}
                    navLink={<div className='dropdownMenuItem-9' 
                    onClick={this.props.logOut}>Log out</div>}
                    toggleShowForm={this.toggleShowForm}
                    navBarPicture={this.props.navBarPicture}
                /> 
                
                {modal}

                <PictureShowContainer toggleShowForm={this.toggleShowForm}/>
            </div>
        )
    }
}

export default PictureNew;