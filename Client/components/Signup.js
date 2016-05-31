import React from 'react';
import {Link} from 'react-router';
import SignupAction from '../actions/SignupAction';
import SignupStore from '../stores/SignupStore';
import lib from '../lib/lib';


class Signup extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = SignupStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount()
  {
    var url = window.location.href;

    if(url.indexOf("verified=false")!=-1) // verification 
    {
        toastr.error('You haven\'t created your account.Please create your account first!');
    }
 
    this.setState(function(prevState,CurrentProps){

      return {

    f_nameValidationState:'',
    l_nameValidationState:'',
    emailValidationState:'',
    passwordValidationState:''


      };

    })

    SignupStore.listen(this.onChange);
  }

  componentWillUnmount()
  {
    SignupStore.unlisten(this.onChange);
  }

  onChange(state)
  {
    this.setState(state);
  }

  handleSubmit(event)
  {
    event.preventDefault();

      var f_name = this.refs.signup_f_name.value;
      var l_name = this.refs.signup_l_name.value;
      var email = this.refs.email.value;
      var pw = this.refs.pw.value;
      var pw2 = this.refs.pw2.value;

      if(!f_name)
      {
          SignupAction.invalidFirstname(); 
      }

      if(!l_name)
      {
        SignupAction.invalidLastName();
      }

      if(!pw)
      {
        SignupAction.invalidPassword();
      }

      if(!email || !lib.RmitEmailCheck(email))
      {
        SignupAction.invalidEmail();
        return;
      }

      if(pw2!=pw)
      {
        SignupAction.noMatchPassword();
        return;
      }
 
    if(f_name!="" && l_name!="" && email!="" && pw!="" && pw2!="")  
    {
       $('.register_button').button('loading');
       SignupAction.signUp(f_name,l_name,email,pw,this.props.history);
    }
  }

	render(){

		return(

			<div className='container-full signup'>
			  <div className="overlay"></div>
    <div className="center-block registration_form_container fadeInUp animated">			  
     <form onSubmit={this.handleSubmit.bind(this)} id="registerForm" className="account_form form-horizontal registration_form" action method="POST" noValidate>
     <h2 className="create_account_header">Create your account</h2>
      
      <div className={'form-group '+this.state.f_nameValidationState}>
          <div className="input-group">  
          <span className="input-group-addon"><i className="fa fa-info"></i></span>
          <input value={this.state.f_name} ref="signup_f_name" type="text" onChange={SignupAction.updateFirstName} className="form-control" id="firstName" placeholder="First Name" />
          </div>
          <span className="help-block">{this.state.helpBlock}</span>
      </div>

      <div className={'form-group '+this.state.l_nameValidationState}>     
          <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-info"></i></span>
          <input value={this.state.l_name} ref="signup_l_name" type="text" onChange={SignupAction.updateLastName} className="form-control" id="lastName" placeholder="Last Name" />
          </div>
          <span className="help-block">{this.state.helpBlock}</span>         
      </div>

      <div className={'form-group '+this.state.emailValidationState}>
          <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
          <input value={this.state.email} ref="email" type="email" onChange={SignupAction.updateEmail} className="form-control" id="inputEmail" placeholder="Email" />
          </div>
         <span className="help-block">{this.state.helpBlock}</span>
     </div>
      

        <div className={'form-group '+this.state.passwordValidationState}>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-key fa-fw" /></span>
            <input ref="pw" id="inputPassword" onChange={SignupAction.updatePassword} className="form-control" type="password" placeholder="Password" />
          </div>
         <span className="help-block">{this.state.helpBlock}</span>
          <div className="clearfix"></div>	
        </div>  

        <div className={'form-group '+this.state.Password2ValidationState}>
          <div className='input-group'>
            <span className="input-group-addon"><i className="fa fa-key fa-fw" /></span>
              <input ref="pw2" type="password" onChange={SignupAction.updatePassword2} className="form-control" id="inputPasswordConfirm" placeholder="Password Confirm" />
            </div>
             <span className="help-block">{this.state.helpBlock}</span>
         </div>


        <div className="form-group">
          <button id="load" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Creating your account" type="submit" className="register_button btn btn-primary">Submit</button>
        </div>
 
      </form>



      </div>



			  <img src="/img/cloud-background.jpg"/>
			</div>


			);
	}
}

export default Signup;