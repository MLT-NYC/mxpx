import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route_util';

import WelcomeContainer from './welcome/welcome_container';
import LogInContainer from './welcome/login_form_container';
import SignUpContainer from './welcome/signup_form_container';
import ProfileContainer from './profile/profile_container';
import PictureFormContainer from './picture/picture_form_container';
import PictureNewContainer from './picture/picture_new_container';
import PictureEditContainer from './picture/picture_edit_container';

const App = () => (
    <div className="outterMost">        
        <Switch>
            <Route exact path='/' component={WelcomeContainer} />
            <AuthRoute exact path='/login' component={LogInContainer} />
            <AuthRoute exact path='/signup' component={SignUpContainer} />
            <ProtectedRoute  path='/pictures/new' component={PictureNewContainer} />
            <Route path='/' component={ProfileContainer}/>
        </Switch>
    </div>
);

export default App;