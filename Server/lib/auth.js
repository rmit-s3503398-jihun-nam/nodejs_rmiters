var config = require('../../config');
var jwt = require('jsonwebtoken');

exports.createToken = function(userObj,userData,res,next)
{
	var token = "";

	token = jwt.sign(userObj,config.JWTSECRET,{
		expiresIn:86400
	});
 
	if(token=="")
	{
		/* handling error in express framework
		*  make new error msg and send it to next middleware
		*/

		const errMsg = new Error("log in token is not created.");
		return next(errMsg);
	}

	res.json({
		token:token,
		user:userData
	});

}


exports.verify_token = function(req,res,next)
{
	var token = req.body.token;
 
		jwt.verify(token,config.JWTSECRET,function(err,decoded){

			if(err)
			{   
				res.json(false);
			}
		   else
		    {
		    	res.json(true);
		    }	

		})
 
}