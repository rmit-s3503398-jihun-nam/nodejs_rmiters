/*  some different boards share one same components eg)buyandsell and accomodation
*	each item for these need exaclty same data 
*   there's no need to have separate controllers 
*	getEachItem method split what method is get called from client side
*/

var mongoose = require('mongoose');
var BuyModel = mongoose.model("Buy");
var Accomdation = mongoose.model("Accomdation");
var User = require('mongoose').model('User');
var config = require('../../config');

 function getModel(modelName)
 {
 	var model = {};

     switch(modelName)
	 {
	    case "buyandsell":
	 	 model = BuyModel;
	 	 break;

	    case "accomodation":
	 	 model = Accomdation;
	 }

	 return model;

 }

exports.getEachItem = function(req,res,next)
{
	var method = req.body.method;

	switch(method)
	{
		case "getItem":
		return exports.getItem(req,res,next);

		case "updateViewCount":
		return exports.updateViewCount(req,res,next);

		case "getOwnerDetail":
		return exports.getOwnerDetail(req,res,next);
	}

}

 exports.getOwnerDetail = function(req,res,next)
 {
 	var model = {};
 	var id = req.body.id;
 	var email;

 	model = getModel(req.body.model);

 	model.findOne({_id:id},function(err,post){

 		if(err) return next(err);

 		email = post.ownerEmail;

 		User.findOne({email:email},function(err,user){

 			if(err) return next(err);

 			res.json({userId:user._id,f_name:user.f_name,profileImg:user.profile_image});

 		})


 	})

 }


 exports.updateViewCount = function(req,res,next)
 {
	 	var model = {};
	 	var id = req.body.id;
	 	var Count = 0;

	 	model = getModel(req.body.model);

	 	model.findOne({_id:id},function(err,user){

	 		if(err) return next(err);
		
			  Count = user.view_count;
			  Count++;
 
			  user.update({view_count:Count},function(err,count){

			  	if(err) return next(err);

			  	res.json(Count);

			  });


	 		})	
 

 }

 exports.getItem = function(req,res,next)
 {
 	var model = {};
 	var id = req.body.id;

	model = getModel(req.body.model);

 	model.findOne({_id:id},function(err,item){

 		if(err)
 		{
			err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_LOAD_DATA);

 			return next(err);
 		}

 		res.json(item);

 	})

 }
