var nodemailer = require('nodemailer');

  module.exports = function()
  {
  	  var smtpTransport = nodemailer.createTransport({

  	  	service:"hotmail",
  	  	auth:{

  	  	  user:"jackandiko@hotmail.com",
  	  	  pass:"tpdlzh8315"	

  	  	}
  	  });

  	  return smtpTransport;


  }