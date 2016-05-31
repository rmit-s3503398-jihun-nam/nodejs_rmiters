var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var config = require('../config');
var validator = require('express-validator');
var fs = require("fs");

 module.exports = function()
 {
 	 var app = express();
 	 app.use(bodyParser.json());
 	 app.use(bodyParser.urlencoded({extended:false}));
 	 app.use(validator());
 
		app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
		}));

 	 require('../Server/routes/users.routes')(app);
 	 require('../Server/routes/verify_email_routes')(app);
 	 require('../Server/routes/buy.routes')(app);
 	 require('../Server/routes/accomo.routes')(app); 
 	 require('../Server/routes/comment.routes')(app);
 	 require('../Server/routes/test.routes')(app);	 	 

 	 app.use(express.static('./public'));

 	 /*	 custom errhandler
 	 *	 if express is used, every route and functions have middleware function next()
 	 *	 if any server error occur, pass err object to middleware next()	
 	 *	 here is the endpoint for err
 	 *	 log into the file
 	 */

 	 app.use(function(err,req,res,next){

		if(err)
		{	

			fs.stat(config.errLogFile,function(erR,file){

				if(erR)
				{
					return next(erR);
				}

				if(file)
				{
					var log = fs.createWriteStream(config.errLogFile,{flags:'a'});
					log.write("\n\n" + err.stack);
					log.end();
				}

			});

			
			if(err.ClientErrMsg!=undefined)
			{
				res.json({err:err.ClientErrMsg});
			}

		} 	 	


 	 })
 	
 	 return app;
 }
