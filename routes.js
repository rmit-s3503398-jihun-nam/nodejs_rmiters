import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Verify from './components/Verify';
import Profile from './components/Profile';
import requireAuth from './components/requireAuth';

export default (	
  <Route component={App}>
     <Route path='/signin' component={Signin} />	
	 <Route path='/' component={Home}/>
	 <Route path="/profile" onEnter={requireAuth} component={Profile} />
     <Route path='/signup' component={Signup} />	     
     <Route path='/verify_your_email' component={Verify} />
  </Route>
);