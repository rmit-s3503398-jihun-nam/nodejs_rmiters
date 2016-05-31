var config = require('../../config');

  exports.makeFileName = function(originalName)
  {
     var imageInfo = originalName.split(".");
     var imageName = imageInfo[0];
     var extention = imageInfo[1];
     var fileName = imageName+"_"+Date.now()+"."+extention;

     return fileName;
  }

  exports.getTimeString = function()
  {
    return new Date(Date.now()).toLocaleString();
  }

  exports.RmitEmailCheck = function(email)
  {
	   var re = config.EMAIL_FORMAT;
	   var validEmail = true;
 
	   for(var prop in re)
	   {

	       if(!re[prop].test(email))
	       {
	          validEmail = false;
	          break;
	       }
	   }

       return validEmail;
  }