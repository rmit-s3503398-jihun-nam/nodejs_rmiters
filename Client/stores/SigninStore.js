import alt from '../../config/alt';
import SigninAction from '../actions/SigninAction';
import lib from '../lib/lib';

class SigninStore{

	constructor()
	{
		this.bindActions(SigninAction);
		this.email = '';
		this.password = '';
		this.emailValidateState = '';
		this.passwordValidateState = '';
		this.jwt = '';
		this.user = '';
		this.timestamp = Math.floor(Date.now() / 1000);
	}
 
 	onInValidEmail()
 	{
 		this.emailValidateState = 'has-error';
 	}	

 	onInValidPassword()
 	{
 		this.passwordValidateState = 'has-error';
 	}

	onLoginSuccess(obj)
	{
		var jwt = obj.data.token;
		var userData = obj.data.userData;
		var full_name = lib.getUpperCase(obj.data.user.f_name) + " " + lib.getUpperCase(obj.data.user.l_name);
		/* store user details in localstorage */
		var myInetested = obj.data.user.interests.join();

		localStorage.setItem('token',jwt);
		localStorage.setItem('id',obj.data.user.id);
		localStorage.setItem('f_name',obj.data.user.f_name);
		localStorage.setItem('l_name',obj.data.user.l_name);
		localStorage.setItem('email',obj.data.user.email);
		localStorage.setItem('full_name',full_name);
		localStorage.setObj('my_subjects',obj.data.user.subjects);
		localStorage.setItem('profile_image',obj.data.user.profile_image);
		localStorage.setItem('major',obj.data.user.major);
		localStorage.setItem('campus',obj.data.user.campus);
		localStorage.setItem('description',obj.data.user.description);
		localStorage.setItem('interests',myInetested);
		localStorage.setItem('country',obj.data.user.country);
 

		this.token = jwt;
		obj.history.pushState(null,'/profile');

	}

	onLoginFail(xhr)
	{

	}
 
	onUpdateEmail(event)
	{
		this.email = event.target.value;
		this.emailValidateState = '';
	}

	onUpdatePassword(event)
	{
		this.password = event.target.value;
		this.passwordValidateState = '';
	}
 
}
 
  export default alt.createStore(SigninStore);