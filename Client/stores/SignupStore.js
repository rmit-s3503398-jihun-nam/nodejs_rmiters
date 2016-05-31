import alt from '../../config/alt';
import SignupAction from '../actions/SignupAction';

 class SignupStore{
 	constructor()
 	{
 		this.bindActions(SignupAction);
 		this.f_name = '',
 		this.l_name = '',
 		this.email = '',
 		this.password = '',
 		this.password2 = '',
		this.f_nameValidationState = '',
		this.l_nameValidationState = '',
		this.emailValidationState = '',
		this.passwordValidationState = '',
		this.Password2ValidationState = ''	 	
 	}

 	onSignupSuccess(payload){
 
 		if(payload.data.created)
 		{
 			 sessionStorage.setItem("email",payload.data.created);
 			 payload.history.pushState(null,'/verify_your_email');  
 		}
      else
      	{
 
      		for(var i=0;i<payload.data.length;i++)
      		{
			 		if(payload.data[i].msg=="email")
			 		{
			 			this.emailValidationState = 'has-error';
			 		}

			 		if(payload.data[i].msg=="f_name")
			 		{
			 			this.f_nameValidationState = 'has-error';
			 		}

			 		if(payload.data[i].msg=="l_name")
			 		{
			 			this.l_nameValidationState = 'has-error';
			 		}

			 		if(payload.data[i].msg=="password")
			 		{
			 			this.passwordValidationState = 'has-error';
			 		}	
      		}
 
		 		$('.register_button').button('reset');

 	   }

 	}

 	onSignupFail(errorMsg)
 	{
 		toastr.error("System Error please try again." + errorMsg);
 		return;
 	}

 	onUpdateEmail(e)
 	{
 		this.email = e.target.value;
 		this.emailValidationState = '';
 	}

 	onUpdateFirstName(e)
 	{
 		this.f_name = e.target.value;
 		this.f_nameValidationState = '';
 	}

 	onUpdateLastName(e)
 	{
 		this.l_name = e.target.value;
 		this.l_nameValidationState = '';
 	}

 	onUpdatePassword(e)
 	{
 		this.password = e.target.value;
		this.passwordValidationState = ''; 		
		this.Password2ValidationState = ''; 
 	}

 	onUpdatePassword2(e)
 	{
 		this.password2 = e.target.value;
 		this.Password2ValidationState = ''; 
 		this.passwordValidationState = ''; 		
 	}

 	onInvalidFirstname()
 	{
 		this.f_nameValidationState = 'has-error';
 	}

 	onInvalidLastName()
 	{
 		this.l_nameValidationState = 'has-error';
 	}

 	onInvalidEmail()
 	{
 		this.emailValidationState = 'has-error';
 	}

 	onInvalidPassword()
 	{
 		this.passwordValidationState = 'has-error';
 	}

 	onNoMatchPassword()
 	{
 		this.PasswordValidationState = 'has-error';
 		this.Password2ValidationState = 'has-error';
 	}

 

 }

 export default alt.createStore(SignupStore);