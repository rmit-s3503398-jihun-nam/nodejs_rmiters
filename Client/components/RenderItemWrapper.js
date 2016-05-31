import React from 'react';
import {Link} from 'react-router';
import ImageGallery from 'react-image-gallery';
import lib from '../lib/lib.js';
import config from '../lib/clientSideInfo';

var ImgSlider = React.createClass({

	render()
	{
		var images;
 		var self = this;	

 		if(this.props.imgArray && this.props.imgArray.length>0)
 		{
	 		images = this.props.imgArray.map(function(img,index){

	 			return {

		    original: '/uploads/'+self.props.url+'/'+img,
		    thumbnail: '/uploads/'+self.props.url+'/thumbs/'+img

	 			}

 			});
        }
      else
        {
        	images = [{

		    original: '/uploads/'+self.props.url+'/default.jpg',
		    thumbnail: '/uploads/'+self.props.url+'/thumbs/default.jpg'

        	}];
        }  
 
		return(

			<div className="col-md-5 sliderWrapper">   
			{typeof images=="object" ? <ImageGallery showThumbnails={images.length>1?"true":"false"} showNav="true" items={images}/> : ""} 
	 </div>


			);
	}


});

var PosterDetail = React.createClass({

	getInitialState()
	{
		return{

		   profileImg:"/uploads/defaults/default_image.jpg",
		   f_name:""
		}
	},

	componentWillMount()
	{
		var self = this;

		$.ajax({

			url:"/getEachItem",
			type:"POST",
			data:{
				method:"getOwnerDetail",
				id:this.props.id,
				model:this.props.url
			},
			success:function(data)
			{
				var profileImg = self.state.profileImg;
 
				if(data.profileImg!=undefined)
				{
					profileImg = "/uploads/profile/"+data.profileImg;
				}

				self.setState({

			      profileImg:profileImg,
			      f_name:data.f_name

				});

			}

		})
	},
 
	render()
	{
		return(

			<div className="col-md-5 PosterDetailWrapper">

				<div>
					<img className="profileImg" src={this.state.profileImg}/>
					<span className="f_name">{this.state.f_name}</span>
				</div>
				<div>
				    <button className="btn btn-success btn-lg sendMsgButton"><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>Send Message</button>
				</div>

			</div>


			);
	}


});

var ItemDetail = React.createClass({

	render()
	{
		return(

			<div className="col-md-5">

				<div className="row">

					<ItemDescription description={this.props}/>

				</div>
				
			</div>

			);
	}

});

var ItemDescription = React.createClass({
 
	render()
	{
		var ItemDesc = this.props.description;
 
	   return (

	   	<table className="table ItemDescriptionTable">
	   	<tbody>
	   		<tr>
	   		  <td>{ItemDesc.title}</td>
	   		</tr>
	   		<tr>
	   		  <td><span><strong>Description: </strong></span>{ItemDesc.description}</td>
	   		</tr>
	   		<tr>
	   		  <td><span><strong>Item Location: </strong></span>{ItemDesc.item_location}</td>
	   		</tr>	   			   		
	   		<tr>
	   		  <td><span><strong>Price: </strong></span>{ItemDesc.price!=""?"$"+ItemDesc.price:"N\/A"}</td>
	   		</tr>
	   		<tr>
	   		  <td><span><strong>Viewed:</strong> </span>{ItemDesc.view_count}</td>
	   		</tr>	   		
	   	</tbody>
	   	</table>

	 
	   	);
	

	}


});

var CommentDefaultReplyComponent = React.createClass({



	replyComment(e)
	{
		e.preventDefault();
		var replyComments = "";
		var self = this;
        var replyTextareaForm = document.getElementById("replyTextarea");
		var postId = this.props.postId;
		var userId = localStorage.getItem("id");
		var userImage = localStorage.getItem("profile_image");
		var userName = localStorage.getItem("f_name");
		var textarea = $(e.target).parent().find(".replyTextWrapper");

        replyTextareaForm.addEventListener('keypress',function(e){

        	$(this).parent().removeClass("has-error");

        })

        	
        	replyComments = validator.escape(replyTextareaForm.value);
 
        	if(replyComments=="")
        	{
        		textarea.addClass('has-error');
        		return false;
        	}

			$.ajax({

				url:"/replyComment",
				type:"POST",
				data:{
					userName:userName,
					userImage:userImage,
					comment:replyComments,
					userId:userId,
					_id:null,
					parentCommentID:null,
					postId:postId

				},
				success:function(data)
				{
	 	    		if(data.err)
		    		{
		    		    toastr.error(data.err);
		    		    return;
		    		}

		    		self.props.newPostInserted(true,data,userImage,userName);

				}



			});
		
	},

	render()
	{
 
		return (
 		<form id='replyForm' className='animated fadeIn'>
 		  <div className='eachCommentWrapper'>
	 	    <img className='img-thumbnail myprofileImage' src={'/uploads/profile/'+localStorage.getItem('profile_image')}/>
	 		 <div className='form-group replyTextWrapper'>
	 		 	<textarea id="replyTextarea" className='form-control' row='8' col='8'></textarea>
	 		 </div>
	 		  <button onClick={this.replyComment} id="replySendButton" className='btn btn-primary btn-sm replySendButton'>Comment</button>
 		  </div>
 		</form>
                );
	}


});
 

var CommentComponent = React.createClass({

	getInitialState()
	{
		return {

		postId:this.props.postId,
		totalComments:[],
		ChunkPageLimit:10, // this is limit for page link buttons eg) show only 10 link buttons for each page
		limit:10,
		offset:0
		}
	},

	componentWillMount()
 	{
 		var self = this;

		$.ajax({

			url:"/getComments",
			type:"POST",
			dataType:"json",
			data:{
				postId:this.props.postId,
				limit:this.state.limit,
				offset:this.state.offset
			}
		}).done(function(data){

 	    		if(data.err)
	    		{
	    		    toastr.error(data.err);
	    		    return;
	    		}

			self.setState({
				totalComments:data.comments
			})

			self.refs["ChunkPageNationComponent"].updateState(data.count);

		})
	},
	
	showNextComments(offset)
	{
 
 		var self = this;

		$.ajax({

			url:"/getComments",
			type:"POST",
			dataType:"json",
			data:{
				postId:this.props.postId,
				limit:this.state.limit,
				offset:offset
			}
		}).done(function(data){

 	    		if(data.err)
	    		{
	    		    toastr.error(data.err);
	    		    return;
	    		}

	    		/* Make sure remove root react element's children before 
	    		*  rendering next comments, otherwise next comments will be	
	    		*  appended on previous comment tree
	    		*/
	    		
	    		$("#commentTreeWrapper").find("#commentTree").children().remove();

 
			self.setState({
				totalComments:data.comments
			})
 
		})

	},

   /* param:commentObj - object having comment details like Id parentID 
    *  list - this function works recusivley, if comment object need to render 
    *  its children with parent, new created wrapper(ul) needs to pass it to the function
    *  so that it wraps with parent wrapper (li)
    *  skip - if object has children , first attach comment to a wrapper  
    *  and call the function again with the object , this case don't need to attach 
    *  comment on top root
    * 
    *  commentTree will be appended with comment nodes recusively 
    *  
    */

	getTotalComments(totalComments)
    {
 
      var commentTree = <ul id="commentTree"></ul>;

        if(totalComments.length>0)
        {
             totalComments.map(function(commentObj,index){

               getComments(commentObj,null,true); 
 
          	})
        }

        function getComments(commentObj,list,skip)
        {

          var comment = list || $("<li></li>"); 
 		  var userID = localStorage.getItem("id");
 		  var currentTime = Date.now();
 
          // new li element or if list is parent wrapper, use it
          // this is root element

          // create ul element for object has children objects
          var ul = $("<ul></ul>");

          // only single comment object with no children will be attached to fresh li
          // otherwise comment var holds this object's parent wrapper element

          if(skip==true) 
          {

          	 var childElement;
 
            if(userID==commentObj.CommentUser._id)
            {
            	if(commentObj.is_deleted)
            	{
            	  childElement = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/"+commentObj.CommentUser.profile_image+"><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>"+commentObj.CommentUser.f_name+"</span><span id='commentPostDate'> said on "+commentObj.post_date+"</span></div><p class='comment_deleted comment'>"+commentObj.comment+"</p></div></div></li>");	
            	} 
              else 
                {	
            	  childElement = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/"+commentObj.CommentUser.profile_image+"><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>"+commentObj.CommentUser.f_name+"</span><span id='commentPostDate'> said on "+commentObj.post_date+"</span><span id='commentId'>"+commentObj._id+"</span><span id='parentCommentID'>"+commentObj.parentCommentID+"</span><span id='userID'>"+commentObj.CommentUser._id+"</span><button id=delete_button_"+currentTime+" class='delete_button btn btn-link'>Delete</button><button id=edit_button_"+currentTime+" class='edit_button btn btn-link'>Edit</button><button class='reply_button btn btn-link'>Reply</button></div><p class='comment'>"+commentObj.comment+"</p></div></div></li>");
            	}
            }
          else
            {
            	if(commentObj.is_deleted)
            	{
 				   childElement = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/"+commentObj.CommentUser.profile_image+"><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>"+commentObj.CommentUser.f_name+"</span><span id='commentPostDate'> said on "+commentObj.post_date+"</span></div><p class='comment comment_deleted'>"+commentObj.comment+"</p></div></div></li>");
            	}	
              else
                {	
            	   childElement = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/"+commentObj.CommentUser.profile_image+"><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>"+commentObj.CommentUser.f_name+"</span><span id='commentPostDate'> said on "+commentObj.post_date+"</span><span id='commentId'>"+commentObj._id+"</span><span id='parentCommentID'>"+commentObj.parentCommentID+"</span><button class='reply_button btn btn-link'>Reply</button></div><p class='comment'>"+commentObj.comment+"</p></div></div></li>");
            	}
            }  


            comment.append(childElement);

          }

          // only single comment object with no children will be attached to root
          if(list==null) $("#commentTree").append(comment);
     
          // if object has children
          if(commentObj.childComments.length>0)
          {

            // if list is null, comment is fresh li element
            // append ul element to li for children

            if(list==null) comment.append(ul);

            for(var i=0;i<commentObj.childComments.length;i++)
            {
    
              // new child comment element
               var childComment;  
               if(userID==commentObj.childComments[i].CommentUser)
               {
               	  if(commentObj.childComments[i].is_deleted)
               	  {
               	  	childComment = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/"+commentObj.childComments[i].userImage+"><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>"+commentObj.childComments[i].userName+" </span><span id='commentPostDate'> said on "+commentObj.childComments[i].post_date+"</span></div><p class='comment_deleted comment'>"+commentObj.childComments[i].comment+"</p></div></div></li>");
               	  }
               	else
               	 {
               	 	childComment = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/"+commentObj.childComments[i].userImage+"><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>"+commentObj.childComments[i].userName+" </span><span id='commentPostDate'> said on "+commentObj.childComments[i].post_date+"</span><span id='commentId'>"+commentObj.childComments[i]._id+"</span><span id='parentCommentID'>"+commentObj.childComments[i].parentCommentID+"</span><span id='userID'>"+commentObj.childComments[i].CommentUser+"</span><button id=delete_button_"+currentTime+" class='delete_button btn btn-link'>Delete</button><button id=edit_button_"+currentTime+" class='edit_button btn btn-link'>Edit</button><button class='reply_button btn btn-link'>Reply</button></div><p class='comment'>"+commentObj.childComments[i].comment+"</p></div></div></li>");
               	 }   

               }
              else
               {
               	  if(commentObj.childComments[i].is_deleted)
               	  {
               	  	childComment = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/"+commentObj.childComments[i].userImage+"><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>"+commentObj.childComments[i].userName+" </span><span id='commentPostDate'> said on "+commentObj.childComments[i].post_date+"</span></div><p class='comment_deleted comment'>"+commentObj.childComments[i].comment+"</p></div></div></li>");
               	  }	
               	 else
               	  {
               	  	childComment = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/"+commentObj.childComments[i].userImage+"><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>"+commentObj.childComments[i].userName+" </span><span id='commentPostDate'> said on "+commentObj.childComments[i].post_date+"</span><span id='commentId'>"+commentObj.childComments[i]._id+"</span><span id='parentCommentID'>"+commentObj.childComments[i].parentCommentID+"</span><button class='reply_button btn btn-link'>Reply</button></div><p class='comment'>"+commentObj.childComments[i].comment+"</p></div></div></li>");
               	  } 
               	  
               } 

               //if no parent wrapper provided, append it to ul element
               //otherwise append to comment which holds parent wrapper element
               // note: use find() method with mixed elements eg) <li><ul></ul></li>
			  //  also #id has to be unique otherwise, it renders every uls.
 
               if(list==null)
               {
                 ul.append(childComment);
               }
              else
               {
                 comment.find("#"+commentObj._id).append(childComment);
               }

               // if current object has also children comments
               // create a parent wrapper element and call the function with it recusively 

               if(commentObj.childComments[i].childComments.length>0)
               {
	                var parentWrapper = $("<ul id="+commentObj.childComments[i]._id+"></ul>");
	                childComment.append(parentWrapper);  
	                getComments(commentObj.childComments[i],childComment,false);
               }

            }
          }
        }

    return commentTree;

	},	

	showReplyForm(target,_id,parentCommentID,dynamic_element,target_id)
	{
 
		var time = Date.now();
		var self = this;
		var replyComments = "";
		var replyCancelButton = "replyCancel" + time;
		var replySendButton = "replySend" + time;
		var replyTextarea = "replyTextArea" + time;
        var replyForm = $("<form id='replyForm' class='animated fadeIn'><div class='eachCommentWrapper "+target_id+"'><img class='img-thumbnail myprofileImage' src=/uploads/profile/"+localStorage.getItem('profile_image')+"><div class='form-group replyTextWrapper'><textarea id="+replyTextarea+" class='form-control' row='8' col='8'></textarea></div><button id="+replySendButton+" class='btn btn-primary btn-sm replySendButton'>Reply</button><button id="+replyCancelButton+" class='btn btn-default btn-sm'>Cancel</button></div></form>");


        if($(target).next().length!=0)
        {
        	if($(target).next()[0].id=="replyForm")
        	{
      		  	return false;
        	}
        }
 
        if(dynamic_element==false)
        {
        	$(replyForm).insertAfter(target);
        }
      else
        {
        	var target = target.find("#"+target_id);
        	$(replyForm).insertAfter(target);
        } 
        

        var cancelButton = document.getElementById(replyCancelButton);
        var replyButton = document.getElementById(replySendButton);
        var replyTextareaForm = document.getElementById(replyTextarea);

        replyTextareaForm.addEventListener('keypress',function(e){

        	$(this).parent().removeClass("has-error");

        })

        cancelButton.addEventListener('click',function(e){

        	e.preventDefault();
 
        	$(this).parent().parent().remove();

        })

        replyButton.addEventListener('click',function(e){

        	e.preventDefault();

        	var textarea = $(this).parent().parent().find(".replyTextWrapper");
        	var replyForm =  $(this).parent().parent();
        	var target = replyForm.prev();
        	

        	replyComments = validator.escape(replyTextareaForm.value);

        	console.log(replyComments);

        	if(replyComments=="")
        	{
        		textarea.addClass('has-error');
        		return false;
        	}
 
        	self.replyComment(replyComments,_id,parentCommentID,target,replyForm);

        })


	},
 

	replyComment(replyComments,_id,parentCommentID,target,replyForm)
	{
 
		var postId = this.state.postId;
		var userId = localStorage.getItem("id");
		var userImage = localStorage.getItem("profile_image");
		var userName = localStorage.getItem("f_name");
		var self = this;
		var newReplyObject = {

				userName:userName,
				userImage:userImage,
				comment:replyComments,
				userId:userId,
				_id:_id,
				parentCommentID:parentCommentID,
				postId:postId
		}

		$.ajax({

			url:"/replyComment",
			type:"POST",
			data:newReplyObject,
			success:function(data)
			{
 	    		if(data.err)
	    		{
	    		    toastr.error(data.err);
	    		    return;
	    		}
 
	    		self.updateCommentState(false,data,userImage,userName,target,replyForm)
			}



		});
 
	},

	updateCommentState(root,commentObj,userImage,userName,target,replyForm)
	{
		var comment;
		var self = this;
		var currentTime = Date.now();

		 if(root==true)
		 {
		 	comment = $("<li><div id="+currentTime+" class='eachCommentWrapper clearfix animated fadeIn'><img class='img-thumbnail' src=/uploads/profile/"+userImage+"><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>"+userName+"</span><span id='commentPostDate'> said on "+commentObj.post_date+"</span><span id='commentId'>"+commentObj._id+"</span><span id='parentCommentID'>"+commentObj.parentCommentID+"</span><span id='userID'>"+commentObj.CommentUser+"</span><button id=delete_button_"+currentTime+" class='delete_button btn btn-link'>Delete</button><button id=edit_button_"+currentTime+" class='edit_button btn btn-link'>Edit</button><button id='newReplyCommentButton_"+currentTime+"' class='reply_button btn btn-link'>Reply</button></div><p class='comment'>"+commentObj.comment+"</p></div></div></li>");
		 	$("#commentTree").append(comment);	
		 	$("#replyTextarea").val("");
		 }
	   else
	     {	
 			 if(target[0].nodeName=="DIV")
 			 {
 			 	 target = target.parent();
 			 }

	     	comment = $("<ul><li><div id="+currentTime+" class='eachCommentWrapper clearfix animated fadeIn'><img class='img-thumbnail' src=/uploads/profile/"+userImage+"><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>"+userName+"</span><span id='commentPostDate'> said on "+commentObj.post_date+"</span><span id='commentId'>"+commentObj._id+"</span><span id='parentCommentID'>"+commentObj.parentCommentID+"</span><span id='userID'>"+commentObj.CommentUser+"</span><button id=delete_button_"+currentTime+" class='delete_button btn btn-link'>Delete</button><button id=edit_button_"+currentTime+" class='edit_button btn btn-link'>Edit</button><button id='newReplyCommentButton_"+currentTime+"' class='reply_button btn btn-link'>Reply</button></div><p class='comment'>"+commentObj.comment+"</p></div></div></li></ul>");
	     	 target.append(comment);
	     	 replyForm.remove();
	     }

	     document.getElementById("edit_button_"+currentTime).addEventListener("click",function(e){

	        var commentParent = $(e.target).parent().parent().parent();
 			var commentId = commentParent.find("#commentId").html();
 		    var postId = self.props.postId;
 		    var rootCommentId = commentParent.find("#parentCommentID").html();
 		    var oldComment = commentParent.find(".comment").html();

 			  $(e.target).hide();

 	        self.updateCommentHolder(oldComment,commentId,postId,rootCommentId,commentParent,e.target);
 				    
	     })	 

	     lib.addEvent(document.getElementById("delete_button_"+currentTime),"click",function(e){

   			 var commentParent = $(e.target).parent().parent().parent();
 			 var commentId = commentObj._id;
 			 var postId = commentObj.postId;
 			 var rootCommentId = commentObj.parentCommentID;

 			 self.updateCommentHtml(commentParent,config.COMMENT_DEFAULT_MESSAGE.DELETE);
 		     self.updateComment(commentId,postId,rootCommentId);
   			 
	     });

         document.getElementById("newReplyCommentButton_"+currentTime)
         .addEventListener("click",function(e){

         e.preventDefault();
 			
 		 var _id = $(e.target).parent().parent().parent().find("#commentId").html();	
 
         self.showReplyForm(comment,_id,commentObj.parentCommentID,true,currentTime);

         });

	},

	updateCommentHtml(targetComment,comment)
	{
	     targetComment.find(".comment").html($("<p class='comment_deleted'>"+comment+"</p>"));
	     targetComment.find(".delete_button").remove();
	     targetComment.find(".edit_button").remove();
	     targetComment.find(".reply_button").remove();
	},

	updateComment(commentId,postId,rootCommentId,comment)
	{
		var Comment = comment || null;

		 $.ajax({

		 	url:"/update_comment",
		 	type:"POST",
		 	data:{
		 		commentId:commentId,
		 		postId:postId,
		 		rootCommentId:rootCommentId,
		 		comment:Comment
		 	},
		 	success:function(data)
		 	{
		 		if(data.error)
		 		{
		 			toastr.error(data.error);
		 		}
		 	}

		 })
	},

	updateCommentHolder(oldComment,commentId,postId,rootCommentId,commentParent,edit_button)
	{
		var current = Date.now();
		var unique_id = current + "_" + commentId;
		var textarea = $("<textarea id="+unique_id+" class='form-control'></textarea>");
		var new_edit_button = $("<button style='float:right' class='btn btn-link' id=new_edit_button"+current+">Edit</button>");
		var self = this;
		new_edit_button.insertAfter(commentParent.find(".delete_button"));
		textarea.val(oldComment);
		var textareaHolder = commentParent.find(".comment");
		var replyButton = commentParent.find(".reply_button");
		var deleteButton = commentParent.find(".delete_button");

		textareaHolder.html(textarea);
		replyButton.hide();
		deleteButton.hide();

		document.getElementById("new_edit_button"+current).addEventListener("click",function(e){

		     var newComment = document.getElementById(unique_id).value;	

		     self.updateComment(commentId,postId,rootCommentId,newComment);

		     textareaHolder.html(newComment);
		     new_edit_button.hide();
		     $(edit_button).show();
		     replyButton.show();
		     deleteButton.show();

		})



 
	},

	render()
	{
		

		var totalComments = this.state.totalComments;
		var commentTree = this.getTotalComments(totalComments);
        var reply_buttons = document.getElementsByClassName("reply_button");
        var delete_buttons = document.getElementsByClassName("delete_button");
        var edit_buttons = document.getElementsByClassName("edit_button");
        var self = this;
 
        // following three buttons are for users who wrote comments
        // three of buttons attach events

        for(var i=0;i<delete_buttons.length;i++)
        {
        	(function(i){

        	   delete_buttons[i].addEventListener("click",function(e){

        	   	 var commentParent = $(e.target).parent().parent().parent();
 				 var commentId = commentParent.find("#commentId").html();
 				 var postId = self.props.postId;
 				 var rootCommentId = commentParent.find("#parentCommentID").html();

 				 self.updateCommentHtml(commentParent,config.COMMENT_DEFAULT_MESSAGE.DELETE);
 				 self.updateComment(commentId,postId,rootCommentId);

        	   })	

        	})(i);
        }

        for(var i=0;i<edit_buttons.length;i++)
        {
        	(function(i){

        	   edit_buttons[i].addEventListener("click",function(e){

        	   	 var commentParent = $(e.target).parent().parent().parent();
 				 var commentId = commentParent.find("#commentId").html();
 				 var postId = self.props.postId;
 				 var rootCommentId = commentParent.find("#parentCommentID").html();
 				 var oldComment = commentParent.find(".comment").html();

 				 $(this).hide();

 				 self.updateCommentHolder(oldComment,commentId,postId,rootCommentId,commentParent,this);
 				 
        	   })	

        	})(i);
        }

        for(var i=0;i<reply_buttons.length;i++)
        {
        	(function(i){

        		reply_buttons[i].addEventListener("click",function(e){

        			e.preventDefault();

        			var _id = $(e.target).parent().find("#commentId").html();
        			var parentCommentID = $(e.target).parent().find("#parentCommentID").html();

        			self.showReplyForm($(e.target).parent().parent().parent(),_id,parentCommentID,false);

        		});

        	})(i)
        }

		return(

			<div>
				<div id="commentTreeWrapper">{commentTree}</div>
			    <CommentDefaultReplyComponent newPostInserted={this.updateCommentState} postId={this.state.postId}/>
				<ChunkPageNationComponent showNextComments={this.showNextComments} ref="ChunkPageNationComponent" eachPageLimit={this.state.limit} ChunkPageLimit={this.state.ChunkPageLimit} totalNumberOfObjects={this.state.totalComments.length} />
			</div>);
  
	}


});

var ChunkPageNationComponent = React.createClass({
  
   /* 
   *  totalPageOffset - this indicates next chunkpages eg)0 = 0~10, 1 = 11-20 
   *  isRenderArrow - eachpagelimit is smaller than totalPageNumbers 
   *  which means we need to show arrows to show next chunkpages 	
   *
   */


   getInitialState()
   {

   	var eachPageLimit = Number(this.props.eachPageLimit);
   	var totalNumberOfObjects = Number(this.props.totalNumberOfObjects);
   	var ChunkPageLimit = Number(this.props.ChunkPageLimit);
   	var totalPageNumbers = Math.ceil(totalNumberOfObjects/eachPageLimit);
   	var totalPageOffset = totalPageNumbers-(ChunkPageLimit*0); // 0 is ChunkPageOffset
 	var isRenderArrow = eachPageLimit < totalPageNumbers ? true : false;
 
 	/*
 	*  When Chunk page arrows are clicked, followings needs to be updated 
 	*  1. ChunkPageOffset: updating 0-1-2-3 one by one 
 	*  2. eachPageOffset: updateing 0-10-20-30 
 	*  3. totalPageOffset by this fomula: totalPageNumbers-(ChunkPageLimit*ChunkPageOffset)
    *  Also need to update eachPageOffset: eachPageOffset * limit(10)0 - 10 -20 -30
 	*/

   	return {

   		totalNumberOfObjects:totalNumberOfObjects,
   		ChunkPageLimit:ChunkPageLimit,
   		eachPageLimit:eachPageLimit,
   		ChunkPageOffset:0,
   		eachPageOffset:0,
   		totalPageNumbers:0,
   		totalPageOffset:totalPageOffset,
   		isRenderArrow:isRenderArrow
   	}

   },

   updateState(length)
   {
   	 if(length>0)
   	 {
	   	  var totalPageNumbers = Math.ceil(length/this.state.eachPageLimit);
	   		this.setState({

	   			totalNumberOfObjects:length,
	   			totalPageNumbers:totalPageNumbers,
	   			totalPageOffset:totalPageNumbers

	   		})
   	 }
   },

  leftArrowClicked(e)
  {
  	  e.preventDefault();

  	  var ChunkPageOffset = this.state.ChunkPageOffset;
  	  var eachPageOffset = this.state.eachPageOffset;
  	  var totalPageOffset = this.state.totalPageOffset;

  	  ChunkPageOffset--;
  	  eachPageOffset = eachPageOffset-this.state.ChunkPageLimit; 
  	  totalPageOffset = this.state.totalPageNumbers+(this.state.ChunkPageLimit*this.state.ChunkPageOffset);

  	  this.setState({

  	  		ChunkPageOffset:ChunkPageOffset,
  	  		eachPageOffset:eachPageOffset,
  	  		totalPageOffset:totalPageOffset

  	  })	

  },

  rightArrowClicked(e)
  {
      e.preventDefault();

  	  var ChunkPageOffset = this.state.ChunkPageOffset;
  	  var eachPageOffset = this.state.eachPageOffset;
  	  var totalPageOffset = this.state.totalPageOffset;

  	  ChunkPageOffset++;
  	  eachPageOffset = eachPageOffset+this.state.ChunkPageLimit; 
  	  totalPageOffset = this.state.totalPageNumbers-(this.state.ChunkPageLimit*ChunkPageOffset);

  	  this.setState({

  	  		ChunkPageOffset:ChunkPageOffset,
  	  		eachPageOffset:eachPageOffset,
  	  		totalPageOffset:totalPageOffset

  	  })

  },

  showNextComments(offset)
  {
  	 this.props.showNextComments(offset);
  },
 
 
  render()
  {
 
  	  var leftArrow = $("#CommentLeftArrow");
  	  var rightArrow = $("#CommentRightArrow");

  	  if(this.state.totalPageNumbers>(this.state.ChunkPageOffset*this.state.ChunkPageLimit)+this.state.ChunkPageLimit)
 	  {
 	  		rightArrow.css("display","block");
 	  }
 	else
 	  {
 	  	   rightArrow.css("display","none");
 	  }  
 	  		
 	  		if(this.state.ChunkPageOffset>0)
 	  		{
 	  			leftArrow.css("display","block");
 	  		} 	  
 	  	  else
 	  	    {
 	  	    	leftArrow.css("display","none");
 	  	    }	


  	 /* react can render array type with components like below
  	 *	pageNation has each EachPageNationLinkComponent 
  	 *  EachPageNationLinkComponent renders <li>element
  	 */


  	  var pageNation = []; 

  	  if(this.state.totalNumberOfObjects>this.state.eachPageLimit)
  	  {	

		  	  for(var i=1;i<this.state.totalPageOffset+1;i++)
		  	  {
		  	  	  var j = i-1;

		  	  	  var pageNumber = this.state.ChunkPageOffset * this.state.ChunkPageLimit + i;
		  	  	  var eachPageOffset = (j*this.state.eachPageLimit) + (this.state.eachPageLimit * this.state.eachPageOffset);
 
		  	  	  var eachPageNation = <EachPageNationLinkComponent showNextComments={this.showNextComments} key={i} offset={eachPageOffset} pageNumber={pageNumber}/>

		  	  	  pageNation.push(eachPageNation);
		 
		  	  	  if(i==this.state.ChunkPageLimit)
		  	  	  {
		  	  	  	  break;
		  	  	  }

		  	  }	

  	  };

  	return(

  			<div className="pagenationWrapper clearfix"><div className="pageNationLeftWrapper"><Link onClick={this.leftArrowClicked} id="CommentLeftArrow" to="#"><i className="fa fa-chevron-left"></i></Link></div><ul className="pagination">{pageNation}</ul><div className="pageNationRightWrapper"><Link onClick={this.rightArrowClicked} id="CommentRightArrow" to="#"><i className="fa fa-chevron-right"></i></Link></div></div>

  		)
  }		


});

var EachPageNationLinkComponent = React.createClass({
 
	showNextComments(e)
	{
 		e.preventDefault();

 		this.props.showNextComments(this.props.offset);
	},

	render()
	{
		return (

			<li key={this.props.key}><Link to="#" onClick={this.showNextComments}>{this.props.pageNumber}</Link></li>

			);
	}


});


var CommentWrapper = React.createClass({



	render()
	{
		return(

			<div className="col-md-10 commentWrapper center-block">
				<CommentComponent postId={this.props.postId}/>
			</div>	
			);
	}


});


var ItemWrapper = React.createClass({

	getInitialState()
	{
		return {

			item_obj:{},
			id:this.props.id

		}
	},

	componentWillMount()
	{
		var item_obj = "";
		var count = 0;

		if(sessionStorage.getItem('item_obj'))
		{
			item_obj = JSON.parse(sessionStorage.getItem('item_obj'));
		}

		/*  if item_obj's id from sessionStorage is different from state.id
		*  	means user enter the id number straight instead of clicking item on the list
		*	in this case, call ajax to get the item again and update state
		*/

		if((item_obj!="" && this.state.id!=item_obj._id) || item_obj=="")
		{
			var self = this;

			$.ajax({

				url:"/getEachItem",
				type:"POST",
				data:{
					method:"getItem",
					id:this.state.id,
					model:this.props.url
				},
				success:function(data)
				{

 	    		if(data.err)
	    		{
	    		    toastr.error(data.err);
	    		    return;
	    		}

					self.setState({
						item_obj:data
					});
				}

			})
		}
	  else
	    {
			this.setState({
				item_obj:item_obj
			});	
	    }


	    /* update each page view count
	    */

	    $.ajax({
	    	url:"/getEachItem",
	    	type:"POST",
	    	data:{
				 method:"updateViewCount",
				 id:this.state.id,
				 model:this.props.url
	    	},
	    	success:function(data)
	    	{
	    		// update view count html
 	    		if(data.err)
	    		{
	    		    toastr.error(data.err);
	    		    return;
	    		}
	    	}
	    })


	},
 

	render()
	{
 
		return(

			<div className="ItemWrapper">
				<div className="row itemAndPosterDetailWrapper">
				  <div className="col-md-10 center-block">
					<ImgSlider url={this.props.url} imgArray={this.state.item_obj.image}/>
					<PosterDetail url={this.props.url} id={this.props.id}/>
					<ItemDetail 
					  title={this.state.item_obj.title}
					  description={this.state.item_obj.description}
					  item_location={this.state.item_obj.item_location}
					  post_date={this.state.item_obj.post_date}
					  price={this.state.item_obj.price}
					  campus={this.state.item_obj.campus}
					  view_count={this.state.item_obj.view_count}/>
					</div>
				</div>
				<div className="row">
					<CommentWrapper postId={this.state.id}/>
				</div>
			</div>

			);
	}

});


var RenderItemWrapper = React.createClass({

  getInitialState()
  {

  	return {
  		url:window.location.pathname.split('/')[1],
  		id:this.props.params.id
  	}
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
						

				     	 <ItemWrapper url={this.state.url} id={this.state.id} />


					 </div>
		 	     </div>
 			 </div>
 		  </div>
 
		 
			)
  }


});

export default RenderItemWrapper;