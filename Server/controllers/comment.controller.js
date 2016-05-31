var mongoose = require('mongoose');
var config = require('../../config');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var lib = require("../lib/helper");

/* Param - commentChunk 
*    	     This is one tree structured comments 
*  		   parentId  
*			 Find parendId for pushing new comment obj 
*	       comment
* 			 new comment object to be pushed
*/ 			

  function pushRecusivley(commentChunk,parentId,comment)
  {
  	  var comments = commentChunk;
  	  runRecusive(commentChunk,parentId);

  	  function runRecusive(commentChunk,parentId)
  	  {
 			// If parent comment found,	
 			// Push new comment in the array
 			// Otherwise call the function recusively

  	  	  if(commentChunk._id==parentId)
  	  	  { 
  	  	  	  commentChunk.childComments.push(comment);
  	  	  	  return;
  	  	  }
  	  	else
  	  	  {
  	  	  	 // need to dig in nested arrays

  	  	  	 for(var i=0;i<commentChunk.childComments.length;i++)
  	  	  	 {
  	  	  	 	 runRecusive(commentChunk.childComments[i],parentId);
  	  	  	 }	

  	  	  }   
  	  }

  	  return comments;

  }


  exports.replyComment = function(req,res,next)
  {
  	 var newCommentId = mongoose.Types.ObjectId();
  	 var parentComment = req.body._id || null;

  	 	  if(parentComment!=null)
  	 	  {

  	 	  var comments;
  	 	  var comment = new Comment({

  	 	  	 _id:newCommentId,
  	 	  	 postId:req.body.postId,
  	 	  	 comment:config.validator.escape(req.body.comment),
  	 	  	 parentCommentID:req.body.parentCommentID,
           post_date:lib.getTimeString(),
  	 	  	 childComments:[],
  	 	  	 CommentUser:req.body.userId,
  	 	  	 userImage:req.body.userImage,
  	 	  	 userName:req.body.userName

  	 	  });	
 
 			/* Use where statement to find root level comment in the post
 			*/

  	 	  	   Comment.findOne()
  	 	  	   		  .where('postId',req.body.postId)
  	 	  	   		  .where('_id',req.body.parentCommentID).
  	 	  	   		  exec(function(err,oldComment){
  	 	  	   		 
  	 	  	   		 	  if(err)
  	 	  	   		 	  {
					  	       err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_LOAD_DATA);
					  	 	     return next(err);
  	 	  	   		 	  }
 
  	 	  	   		 	  comments = pushRecusivley(oldComment,parentComment,comment);
  	 	  	   		 	  comments.save(function(err,coment){

      			  	 	  		if(err)
      			  	 	  		{
      					  	       err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_LOAD_DATA);
      					  	 	     return next(err);
      			  	 	  		}
  	 	  	   		 	  	res.json(comment);
  	 	  	   		 	 
  	 	  	   		 	  })

  	 	  	   		  })
  	 	  }
  	 	else
  	 	  {

  	 	  // no parent id , means, this comment is root level comment  
 
  	 	  var comment = new Comment({

  	 	  	 _id:newCommentId,
  	 	  	 postId:req.body.postId,
           post_date:lib.getTimeString(),
  	 	  	 comment:config.validator.escape(req.body.comment),
  	 	  	 parentCommentID:newCommentId,
  	 	  	 childComments:[],
  	 	  	 CommentUser:req.body.userId

  	 	  });	  	 	  	

	  	 	  comment.save(function(err,comment){

	  	 	  		if(err)
	  	 	  		{
			  	       err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_LOAD_DATA);
			  	 	   return next(err);
	  	 	  		}

	  	 	  		res.json(comment);

	  	 	  });
  	 	  }   



  }

  exports.update_comment = function(req,res,next)
  {
      var option = config.validator.escape(req.body.comment)==""? {type:"delete"} : {type:"update",comment:req.body.comment};

      Comment.findOne()
      .where({postId:req.body.postId})
      .where({_id:req.body.rootCommentId})
      .exec(function(err,comment){

         if(err)
         {
            err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_DELETE_DATA);
            return next(err);
         }
 
           findComment(option,comment,req.body.commentId,res);
 
      })
  }

  function findComment(option,commentObj,targetCommentId,res)
  {
 
      findRecusively(commentObj,targetCommentId);
      function findRecusively(comment,targetCommentId)
      {
          if(comment._id==targetCommentId)
          {
              if(option.type=="delete")
              {
                comment.comment = config.COMMENT_DEFAULT_MESSAGE.DELETE;
                comment.is_deleted = true;
              }
           else if(option.type=="update")
              {
                 comment.comment = option.comment;
              }  

              return;
          }
        else
          {
              if(comment.childComments.length>0)
              {
                  for(var i=0;i<comment.childComments.length;i++)
                  {
                     findRecusively(comment.childComments[i],targetCommentId);
                  }
              }


          }  
      }
 
    commentObj.save(function(err,comment){

        if(err)
        {
            err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_DELETE_DATA);
            return next(err);
        }

        res.end();

    })

  }

/* mongodb doesn't surport deep populate so
*  need to check if commented users have changed their profile image or not manually
*  get the whole comments first and dig in recusively 	
*  and get each user , match profile images
*  Note: need to chase when asycs operations finishes
*  when asyc finishes, data can be finally send through res.json
*  THIS function must be checked again before deployment for performace reason
*
*/

/* THis method get postId as param
*  and get all comments and return it
*/

  exports.getComments = function(req,res,next)
  {
 
     var Co = Comment.find({postId:req.body.postId}).count();
     Co.exec(function(err,count){

    Co.find({postId:req.body.postId})
     .populate('CommentUser','f_name profile_image')
     .sort({"post_date":"ascending"})
     .limit(req.body.limit)
     .skip(req.body.offset)
     .exec(function(err,comments){
 
      if(err)
        {  
           err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_LOAD_DATA);
         return next(err);
      }

      if(comments.length==0)
      {
          res.end();
      }
 
        checkUserImage(comments);
    
      function checkUserImage(comments)
      {
        var newComments = comments;
        var k = 0;
        var r = 0;
          if(comments.length>0)
          {
             for(var i=0;i<comments.length;i++)
             {   
               run(comments[i]);
             }
          }

         function sendData()
         {
          res.json({comments:newComments,count:count});
         }

         /*  recusive function run need to be chased with some variables
         *   so that we know when it's finished
         */

        function run(commentObj)
        {
 
           if(commentObj.CommentUser.profile_image==undefined)
           {
            User.findOne({_id:commentObj.CommentUser},function(err,user){

             if(commentObj.userImage!=user.profile_image)
             {
              commentObj.userImage = user.profile_image;
             }

              if(commentObj.childComments.length>0)
              {
                   for(var j=0;j<commentObj.childComments.length;j++)
                   {  
                      k++;

                      run(commentObj.childComments[j]);
                   }
              }

                k--;

              if(k==0)
              {
                sendData();
              }

            })

           }
           else
             {

              // this else block runs for 
              // comment object which has CommentUser.profile_image property
              // MEANS only root level comment objects come here
              // so don't need to match profile images, it's already sync with User model

               if(commentObj.childComments.length>0)
               {
                 for(var j=0;j<commentObj.childComments.length;j++)
                 {
                    k++;

                    run(commentObj.childComments[j]);
                 }
               }
              else
               {
                // if no childComments, check other root level comments and send data
                // r is only incremented here, it match with total root level comments length
                  r++;

                if(r==comments.length)
                {
                       return sendData();
                }
 
               } 
             }   

        }
      }



     });

     })
 
 
  	 
  }
 
