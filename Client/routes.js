import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Verify from './components/Verify';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import requireAuth from './components/requireAuth';
import Buyandsell from './components/Buyandsell';
import Accomodation from './components/Accomodation';
import RenderItemWrapper from './components/RenderItemWrapper';
import ClubComponent from './components/ClubComponent';

export default (	
  <Route component={App}>
     <Route path='/signin' component={Signin} />	
	 <Route path='/' component={Home}/>
	 <Route path="/profile" onEnter={requireAuth} component={Profile} />
	 <Route path="/userProfile/:id" onEnter={requireAuth} component={UserProfile} />
	 <Route path="/buyandsell" onEnter={requireAuth} component={Buyandsell} />
	 <Route path="/clubs" onEnter={requireAuth} component={ClubComponent} />	 
	 <Route path="/buyandsell/:id" onEnter={requireAuth} component={RenderItemWrapper} />
	 <Route path="/accomodation" onEnter={requireAuth} component={Accomodation} />
	 <Route path="/accomodation/:id" onEnter={requireAuth} component={RenderItemWrapper} />
     <Route path='/signup' component={Signup} />	     
     <Route path='/verify_your_email' component={Verify} />
  </Route>
);