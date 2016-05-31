var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var Comment = new Schema({

	_id:{type:String},
	comment:{type:String},
	CommentUser:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},
	postId:{
		type:String
	},	
	post_date:{
		type:String
	},
	userImage:{
		type:Schema.Types.String,
		ref:'User',
	},
	userName:{
		type:Schema.Types.String,
		ref:'User',
	},
	is_deleted:{
		type:Boolean,
		default:false
	},
	parentCommentID:{
		type:String,
		default:null
	}

});

  /* This is how to do self referencing 
  *  To make a tree structure of comments
  *  each comment schema's childComments need to have the same schema
  *	 after finishing decalration of Comment, we can add childComments by using add method 
  */

  Comment.add({
  	childComments:[Comment]
  })


mongoose.model('Comment',Comment);