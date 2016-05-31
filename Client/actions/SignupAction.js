import alt from '../../config/alt';

 class SignupAction{
 	constructor()
 	{
 		this.generateActions(

 			'signupSuccess',
 			'signupFail',
 			'updateEmail',
 			'updateFirstName',
 			'updateLastName',
 			'updatePassword',
 			'updatePassword2',
 			'invalidFirstname',
 			'invalidLastName',
 			'invalidEmail',
 			'invalidPassword',
 			'noMatchPassword'

 			);
 	}

 	signUp(f_name,l_name,email,pw,history)
 	{
 		$.ajax({

 			type:'POST',
 			url:'/signup',
 			data:{
 				f_name:f_name,
 				l_name:l_name,
 				email:email,
 				password:pw
 			}
 		}).done((data)=>{

 	    		if(data.err)
	    		{
	    		    toastr.error(data.err);
	    		    return;
	    		}
 			
 			this.actions.signupSuccess(
 				{
 					data:data,
 					history:history
 				}
 				);
 		}).fail((xhr)=>{
 			this.actions.signupFail(xhr.responseJSON.message);
 		})
 	}
 }


export default alt.createActions(SignupAction);




