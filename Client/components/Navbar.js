import React from 'react';
import lib from '../lib/lib.js';
import {Link} from 'react-router';
import NavbarAction from '../actions/NavbarAction';
import NavbarStore from '../stores/NavbarStore';
import SideNav from './SideNav';

 class Navbar extends React.Component
 {
    constructor(props)
    {
       super(props);
       this.onChange = this.onChange.bind(this);
       this.state = NavbarStore.getState();  
    }

  changeProfileImage(profileImage)
  {
     this.refs["mainNavBar"].changeProfileImage(profileImage);
  }

    componentWillMount()
    {
        this.state.loggedIn = lib.loggedIn();
    }

    componentWillReceiveProps()
    {
       this.state.loggedIn = lib.loggedIn();
    }

    componentDidMount()
    {
       NavbarStore.listen(this.onChange);
    }

    componentWillUnmount()
    {
      NavbarStore.unlisten(this.onChange);
    }

    onChange(state)
    {
       this.setState(state);
    }

    

    handleSubmit()
    {
        NavbarAction.logout(this.props.history);
    }
 
    render()
    {



      return (

      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="main_menu_toggle navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#"><img src="/img/logo.png" /><p>Rmiters</p></a>


            
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="active"><Link to='/'>Home</Link></li>
              <li><Link to='/clubs'>Home</Link></li>
              <li><Link to="/buyandsell">Buy & Sell</Link></li>
              <li><Link to="/accomodation">Accomodation</Link></li>   
            </ul>
            <ul className="nav navbar-nav navbar-right top_menu">
 

            {this.state.loggedIn ?

<button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-primary sign_out">Sign out</button>
                   :
               <div className="right_menu_wrapper"> 
                <Link to='/signin' className="btn btn-primary sign_up">Sign In</Link>
                <Link to='/signup' className="btn btn-primary sign_up">Sign Up</Link>
               </div>    

            }


        </ul>
          </div> 
        </div>
{this.state.loggedIn ?
        <SideNav ref="mainNavBar" is_logged_in={this.state.loggedIn}/>
        :
       undefined}   
      </nav>

      
      
    );
    }

 }
 
 export default Navbar;