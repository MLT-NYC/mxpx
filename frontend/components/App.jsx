import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {AuthRoute} from '../util/route_util';

import WelcomeContainer from './welcome/welcome_container';
import LogInContainer from './welcome/login_form_container';
import SignUpContainer from './welcome/signup_form_container';

const App = () => (
    <div>        
        <Switch>
            <Route exact path='/' component={WelcomeContainer} />
            <AuthRoute exact path='/login' component={LogInContainer} />
            <AuthRoute exact path='/signup' component={SignUpContainer} />
        </Switch>
    </div>
);

export default App;