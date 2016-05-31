import React from 'react';
import {Link} from 'react-router';

 var UserProfile = React.createClass({

 	getInitialState()
 	{
 		return {

 			user:{}

 		}
 	},

//test id 568b621816fdbef41364c0af
 	componentDidMount()
 	{
 		$.ajax({

 			url:'/userProfile/getUser',
 			type:"POST",
 			data:this.props.params
 		}).done(function(data){

 	    if(data.err)
	    {
	        toastr.error(data.err);
	    	   return;
	    }
 			
 			console.log(data);

 		}).fail(function(xhr){

 			console.log(xhr);

 		})
 	},

 	render()
 	{
 		
		var sideMenu = $(".sideMenu").width();
		var padding = 55;
 
		if(sideMenu==null || sideMenu==230)
		{
			padding = 230;
		}

		return(

		  <div id="wrapper">	
 
     		   <div style={{paddingLeft:padding}} className="home_wrapper">
		     <div className="container-fluid"> 
			     <div className="row home_wrapper2 profile_container">
					
					hello
 

					</div>

	 			 </div>
 			 </div>
 					 </div>
 
		 
			)
	}


});


 export default UserProfile;