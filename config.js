var path = require('path');
var appDir = path.dirname(require.main.filename);
var validator = require('validator');

module.exports = {
	db:'mongodb://localhost/rmiter',
	RootDir:appDir,
	errLogFile:appDir+'/errLog.log',
	sessionSecret:'development',
	JWTSECRET:'development',
	EMAIL_FORMAT:{
	 	student:/^s\d+@student.rmit.edu.au/
	},	
	validator:validator,
	profileImageMimeType:["image/jpg","image/jpeg","image/png","image/gif"],
	profileImageMaxSize:2000000,
	profileImageDefault:"default_image.jpg",
	countries:
	{
		AUS:"aus",
		VIETNAM:"Vietnam"
	},
	campuses:{

		"Bundoora":"aus",
		"Point Cook":"aus",
		"Melbourne City":"aus",
		"Vietnam":"Vietnam"

	},
	buyandsellDefaultImage:"hill.png",
	buyandsellListLimit:10,
	accomodationDefault:"hill.png",
	accomodationListLimit:10,

	ClientErrorMessages:{

	  FAIL_LOAD_DATA:"System Error: Failed to load data",
	  FAIL_IMAGE_UPLOAD:"System Error: Failed to upload image",
	  FAIL_POST_NEW_DATA:"System Error: Failed to upload",
	  FAIL_LOAD_USER:"System Error: Failed to load the user data",
	  FAIL_CREATE_USER:"System Error: Failed to create user",
	  FAIL_LOGIN:"System Error: Failed to log in, please try again",
	  FAIL_UPDATE_DATA:"System Error: Failed to update",
	  FAIL_DELETE_DATA:"System Error: Failed to delete"


	},

	/* when server err found, log it in the file and 
	*  also inform the user
	*  this message whill be used at express custom err hanlder function
	*/

	InsertClientErrMessage:function(err,errMsg)
	{
		 err.ClientErrMsg = errMsg;
		 return err;
				
	},

	COMMENT_DEFAULT_MESSAGE:{
		DELETE:"This comment has been deleted by the commenter"
	}


		//mongodb://tpdlzh:nam8315@ds035137.mongolab.com:35137/events
}