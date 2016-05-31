import React from 'react';

class Verify extends React.Component{
 
 	constructor(props)
 	{
 		super(props);
 	}

 	componentDidMount()
 	{
 		$("#email").html(sessionStorage.getItem("email"));
 	}

	render()
	{
		return (

             <div className="container">
             	<div className="row mail_sent_wrapper center-block flipInX animated">
             		<div className="col-md-6 center-block">  
	             		   	 <h4>Please verify your email address</h4>
	             			 <img className="mail_sent" src="/img/mail_sent.png"/>

             			<div>
		             			<h4 className="email_sent_wrapper">
		             			You are almost done! A verification message has been sent to<br/>                       
		             			 <strong><em><span id="email"></span></em></strong>
		             			</h4>
	             			<p>
	             				Check your email and follow the link to veryfy your email address.
	             				Once you verify it, you will be able to sign in and create your profile.
	             			   	
	             			</p>             		
             			</div>

	                </div>


             		</div>           		
             	</div>

			);
	}

}

export default Verify;