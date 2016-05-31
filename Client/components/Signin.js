import React from 'react';
import SigninAction from '../actions/SigninAction';
import SigninStore from '../stores/SigninStore';


class Signin extends React.Component
{
  constructor(props)
  {
     super(props);
     this.state = SigninStore.getState();
     this.onChange = this.onChange.bind(this);
  }

  onChange(state)
  {
     this.setState(state);
  }
 
 componentDidMount()
 {
      var url = window.location.href;

      if(url.indexOf("verified=true")!=-1) // verification 
      {
          toastr.success('You successfully verified your email. Sign in now.');
      }  

      this.setState(function(preState,props){
        return {    
                  emailValidateState:'',
                  passwordValidateState:''
               };
      })

      SigninStore.listen(this.onChange);
 }

  componentWillUnmount()
  {
    SigninStore.unlisten(this.onChange);
  }


handleSubmit(event)
{
    event.preventDefault();

    var email = this.refs.login_email.value;
    var password = this.refs.login_pw.value;

    if(!email)
    {
       SigninAction.inValidEmail();
    }

    if(!password)
    {
      SigninAction.inValidPassword();
    }

    if(email && password)
    {
        $('.signin_button').button('loading');
  
        SigninAction.logIn({
          email:email,
          password:password,
          history:this.props.history
        });
    }

}

	render(){

		return(

			<div key={this.state.timestamp} id="signin" className='container-full signup'>
			  <div className="overlay"></div>
    <div ref="form_wrapper" className="center-block registration_form_container fadeInUp animated">			  
     <form role="form" id="registerForm" onSubmit={this.handleSubmit.bind(this)} className="form-horizontal registration_form" noValidate>
     <h2 className="create_account_header">Sign In</h2>
 
      <div className={"form-group " + this.state.emailValidateState}>
          <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
          <input ref="login_email" type="email" onChange={SigninAction.updateEmail} className="form-control" id="inputEmail" placeholder="Email"/>
          </div> 
     </div>

      

        <div className={"form-group " +this.state.passwordValidateState}>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-key fa-fw" /></span>
            <input ref="login_pw" id="inputPassword" onChange={SigninAction.updatePassword} className="form-control" type="password" placeholder="Password"/>
          </div>
       </div>


        <div className="form-group">
          <button id="load" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Signing In" type="submit" className="signin_button btn btn-primary">Submit</button>
        </div>
 
      </form>



      </div>



			  <img src="/img/cloud-background.jpg"/>
			</div>


			);
	}
}

export default Signin;

 