import React from 'react';
import {Link} from 'react-router';

 var sideNav = React.createClass({

 	getInitialState()
 	{
 		return {
		  profileImage:(localStorage.getItem("profile_image") == "undefined" || null) ? "default_image.jpg" : localStorage.getItem("profile_image")
 		}
 	},

  changeProfileImage(profileImage)
  {
 
     this.setState({
        profileImage:profileImage
     });
  },

 	componentDidMount()
 	{
  		var menu = $(".control_board ul li a");
 
 		var url = window.location.href;

	    for(var i=0;i<menu.length;i++)
	    {
	    	if(url.indexOf(menu[i].text.toLowerCase())!=-1)
	    	{
	 			 $(menu[i]).children().css({"color":"#ffffff"});
	 			 $(menu[i]).css({

	 			 	"color":"#ffffff",
	 			 	"paddingLeft":"17px",
	 			 	"background-color":"#1c2529",
	 			 	"textDecoration":"none",
	 			 	"borderLeft":"3px solid #4f80c3"	

	 			 });

	    	}

	 		menu[i].addEventListener('click',function(e){

	 			  var clicked = $(this)[0].text;	

		 			for(var j=0;j<menu.length;j++)
		 			{
		 				if(menu[j].href.indexOf(clicked.toLowerCase())==-1)
		 				{
		 					 $(menu[j]).children().css({"color":""});
				 			 $(menu[j]).css({

				 			 	"color":"",
				 			 	"paddingLeft":"",
				 			 	"background-color":"",
				 			 	"textDecoration":"",
				 			 	"borderLeft":""	

				 			 });
		 				} 
		 			}

	 			  $(this).children().css({"color":"#ffffff"});

	 			 $(this).css({

	 			 	"color":"#ffffff",
	 			 	"paddingLeft":"17px",
	 			 	"background-color":"#1c2529",
	 			 	"textDecoration":"none",
	 			 	"borderLeft":"3px solid #4f80c3"	

	 			 });

	 		})		
	  	}
 	},

toggleSideBar()
    {

     var sidebar = $(".sideMenu");
     var Homewrapper = $(".home_wrapper");
     var profile_photo_wrapper = $(".profile_photo_wrapper");
     var profile_photo = profile_photo_wrapper.find("img");
     var h5 = profile_photo_wrapper.find("h5");
     var left_value = sidebar.width();
     var toggled = left_value == 230 ? true : false;
     var control_board = $(".control_board ul");
     var links = $(".control_board a");
     var spans = $(".control_board a span");
     var main_menu_toggle = $('.main_menu_toggle');
 
       if(toggled==true)
       {
             profile_photo.hide();
             h5.hide();
             spans.hide();
             links.width(35);

               Homewrapper.animate({

                 paddingLeft:"-=175"

               },300);

               sidebar.animate({

                 width:"-=175"

               },300); 

               control_board.width(55);
       }
     else
       {

               Homewrapper.animate({

                 paddingLeft:"+=175"

               },300);

               sidebar.animate({

                 width:"+=175"

               },300,function(){


               profile_photo.show();
               h5.show();
               links.width(210);
               spans.show();

               }); 

               control_board.width(230);
       }   

       return;
    }, 	
 

 	render()
 	{
 		var full_name = localStorage.getItem('full_name');
 
 		return (

 			<div className="sideMenu">

 				<div className="profile_photo_wrapper">
 					<img className="profile_small_photo circular" src={'/uploads/profile/'+ this.state.profileImage}/>
 					<h5>{full_name}</h5>

            {this.props.is_logged_in ?

            <button onClick={this.toggleSideBar} type="button" style={{display:'block',padding:0,marginTop:17}} className="sidebar_toggle_button navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
                   :
               <div></div>    

            }



 				</div>
 				
 				<div className="control_board">

 					<ul>
 					  <li><Link to="/profile"><i className="fa fa-user"></i><span>Profile</span></Link></li>
 					  <li><Link to="/inbox"><i className="fa fa-envelope"></i>Inbox</Link></li>
 					  <li><Link to="/friends"><i className="fa fa-users"></i>Friends</Link></li>
 					  <li><Link to="/articles"><i className="fa fa-book"></i>Articles</Link></li>
 					  <li><Link to="/settings"><i className="fa fa-cogs"></i>Settings</Link></li>
 					</ul>

 				</div>

 			</div>

 			)
 	}


 });


 export default sideNav;