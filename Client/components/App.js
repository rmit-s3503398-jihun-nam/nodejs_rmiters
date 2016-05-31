import React from 'react';
import Navbar from './Navbar';
import lib from '../lib/lib';

const App = React.createClass({

  getInitialState() {

  	var self = this;

  	if(localStorage.getItem("id"))
  	{
  		$.ajax({

  			url:"/userProfile/getUser",
  			type:"POST",
  			dataType:"JSON",
  			data:{
  				id:localStorage.getItem("id")
  			},
  			success:function(data)
  			{
  				localStorage.setItem("profile_image",data.profile_image);
  				var profile = data.profile_image
  				self.updateProfileImage(profile);
  				
  			}

  		})
  	}	
  


    return {
      loggedIn: lib.loggedIn()

    }
  },

  updateProfileImage(profileImage)
  {
  	  this.refs["mainNavBar"].changeProfileImage(profileImage);
  },
 
	render:function()
	{
		return (

			<div>
			    <Navbar ref="mainNavBar" history={this.props.history}/>
				{this.props.children}
			</div>
			);
	}
});

 export default App;