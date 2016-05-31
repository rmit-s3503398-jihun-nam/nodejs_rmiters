var User = require('mongoose').model('User');
var config = require('../../config');

exports.getUser = function(req,res,next)
{
	User.findOne({_id:req.body.id},function(err,user){
 
		if(err)
		{
			err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_LOAD_USER);

			return next(err);
		}

		res.json(user);

	});
}