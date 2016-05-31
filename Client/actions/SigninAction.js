import alt from '../../config/alt';

 class SigninAction{
 	constructor()
 	{
 		this.generateActions(

 			'loginSuccess',
 			'loginFail',
 			'updateEmail',
 			'updatePassword',
 			'inValidEmail',
 			'inValidPassword'

 			);
 	}

 	logIn(payload)
 	{

 		$.ajax({

 			url:'/signin',
 			type:'POST',
 			data:{
 				email:payload.email,
 				password:payload.password
 			}

 		})
 		.done((data)=>{

 	    		if(data.err)
	    		{
	    		    toastr.error(data.err);
	    		    return;
	    		}

 			if(data.valid===false)
 			{
 				$('.signin_button').button('reset');
			    toastr.error(data.msg);
 			    return false;
 			}
 		  else if(data.token)	
            {
		 			this.actions.loginSuccess(
		 			{
		 				data:data,
		 				history:payload.history
		 			}
		 			);
 		    }
 		  else
 		   {
 		   	  toastr.error("Invalid email or password");
 		   	  $('.signin_button').button('reset');
 		   	  return false;
 		   }  

 		})
 		.fail((xhr)=>{

 			this.actions.loginFail(xhr);
 		})

 	   		
 	}

 }

 export default alt.createActions(SigninAction);