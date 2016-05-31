var smtpTransport = require('../../config/nodemailer');

  exports.sendMail = function(mailOptions)
  {
  	  smtpTransport().sendMail(mailOptions,function(error,response){

  	  	if(error)
  	  	{
  	  		console.log(error);
  	  		response.end('error');
  	  	}
  	  else
  	    {
  	    	console.log('Message has been sent');
  	    }	

  	  })
  }	

  