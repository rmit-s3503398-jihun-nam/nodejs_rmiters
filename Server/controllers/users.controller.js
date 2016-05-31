var User = require('mongoose').model('User');
var nodemailer = require('../lib/nodemailer');
var swig = require('swig');
var config = require('../../config');
var helper = require('../lib/helper');
var auth = require('../lib/auth');
var multer = require('multer');
var fs = require("fs");
var appDir = config.RootDir;
var storage = multer.diskStorage({
  destination:function(req,file,callback)
  {
     callback(null,'./public/uploads/profile');
  },
  filename:function(req,file,callback)
  {
      if(req.body.filesize > config.profileImageMaxSize)
      {
         return callback("File size not more than 200k");
      }

      if(config.profileImageMimeType.indexOf(file.mimetype)==-1)
      {
          return callback("Mimetype has to be one of these JPG,PNG,GIF");
      }

     var imageInfo = file.originalname.split(".");
     var imageName = imageInfo[0];
     var extention = imageInfo[1];
     var fileName = imageName+"_"+Date.now()+"."+extention;
 
     callback(null,fileName);
  } 
});

var upload = multer({storage:storage}).any();

 exports.render = function(req,res,next)
 {
      var page = swig.renderFile('views/index.html');
      res.status(200).send(page);
 }

 exports.create = function(req,res,next)
 {

 	req.checkBody("email","email").isEmail();
 	req.checkBody("f_name","f_name").notEmpty();
 	req.checkBody("l_name","l_name").notEmpty();
 	req.checkBody("password","password").notEmpty();

 	var errors = req.validationErrors();
  var ValidEmail = true;

  // ValidEmail = helper.RmitEmailCheck(req.body.email);

 	if(errors)
 	{	
 		res.send(errors);
 		return;
 	}

  if(ValidEmail==false)
  {
    res.send([{msg:"email"}]);
    return;
  }



 	var user = new User({

     f_name:config.validator.escape(req.body.f_name),
     l_name:config.validator.escape(req.body.l_name),
     email:config.validator.escape(req.body.email),
     password:config.validator.escape(req.body.password),
     profile_image:config.profileImageDefault

 	});

 	user.save(function(err){

   /* handling error when something goes worng while inserting data
   * 
   */ 

 		if(err) 
    {
      err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_CREATE_USER);
 			return next(err);
 		}
   else
    {
 			
 			var compiledHTML = swig.renderFile('views/mailTemplate.html',{

 				f_name:user.f_name.charAt(0).toUpperCase() + user.f_name.slice(1),
 				l_name:user.l_name.charAt(0).toUpperCase() + user.l_name.slice(1),
 				link:"http://localhost:3000/verify/"+user._id.toString()

 			});
 			var mailOptions = {

 				from:'Rmiters <jackandiko@hotmail.com>',
 				to:user.email,
 				subject:"Please verify your account",
 				html:compiledHTML
 			};

 			nodemailer.sendMail(mailOptions);
 			res.json({"created":user.email});

 	  }
  })

 }
 
 exports.verifyUser = function(req,res,next)
 {
 
 	if(req.params)
 	{
	   User.findOne({

		  _id:req.params.id
	   
	   },function(err,user){

      if(err)
      {
          return next(err);
      }

	   	  if(user)
	   	  {
	   	  	 user.update({verified:true},function(err,user){
	   	  	 	
	   	  	 	if(err)
	   	  	 	{
	   	  	 		return next(err);
	   	  	 	}
              res.redirect('/signin?verified=true');

	   	  	 });
	   	  }
	   	else
	   	  {
	   	  	  res.redirect('/signup?verified=false');
	   	  }  


	   })

	}


 }


 exports.signin = function(req,res,next)
 {

 	req.checkBody("email").isEmail().notEmpty();
 	req.checkBody("password","password").notEmpty();

 	var errors = req.validationErrors();

 	if(errors)
 	{	
 		res.send(errors);
 		return;
 	}

    var email = config.validator.escape(req.body.email);
    var password = config.validator.escape(req.body.password);

    User.findOne({email:email},function(err,user){

     if(err)
     {
         err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_LOGIN);      
         return next(err);
     }

    	if(!user)
    	{
    		res.json(
    			{
    				valid:false,	
    				msg:"You are not a registered user. Please create your account."
    			});
    		return;
    	}

    	if(!user.authenticate(password))
    	{
    		res.json({

    		        valid:false,	
    				msg:"Your password is incorrect. please check your password again."

    		});
    		return;
    	}

      if(user.verified==false)
      {
        res.json({

            valid:false,  
            msg:"Please verify your email."

        });
        return;
      }

    	// if the user is found
    	// create token and return

    	auth.createToken({
    		userName:user.f_name
    	},
      {
         f_name:user.f_name,
         l_name:user.l_name,
         email:user.email,
         id:user._id,
         subjects:user.subjects,
         profile_image:user.profile_image,
         major:user.major,
         interests:user.interests,
         campus:user.campus,
         description:user.description,
         country:user.country
      }
      ,res,next);


    })
 	  		 	

 }

 exports.updateSubject = function(req,res,next)
 {
  
      var subjects = [];
      var len = req.body.subjects.split(",");
 
      for(var i=0;i<len.length;i++)
      {
         subjects.push(len[i]);
      }

     User.update({_id:config.validator.escape(req.body.id)},
      {subjects:subjects}
      ,function(err,affected,user){

        if(err)
        {
          err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_UPDATE_DATA);
          return next(err);
        }
       else
        {
           res.json(user);
        } 

     })

 }

 exports.updateProfileImage = function(req,res,next)
 {
     var ProfileImage = "";
     var old_image;
     upload(req,res,function(err){

      if(err)
      {
        return res.json({err:err});
      }

     ProfileImage = req.files[0].filename;

      if(ProfileImage!="")
      {
         User.findOne({_id:config.validator.escape(req.body.name)},function(err,user){
 
             if(err)
             {
                return next(err);
             }
            else
             {
                old_image = user.profile_image;
                user.profile_image = ProfileImage;
                user.update({profile_image:ProfileImage},function(err){

                  if(err)
                  {
                     return next(err);
                  }
                 else
                  {
 
                      var filePath = appDir + "/public/uploads/profile/" + old_image;
                      fs.stat(filePath,function(err,stat){

                        if(err)
                        {
                           return next(err);
                        }
 

                           fs.unlink(filePath,function(err){

                            if(err) return next(err);
                       
                            return res.json(ProfileImage);

                           });
 


                     }); 





                     
                  } 

                });

               
             }  

         })
 
      }
     else
      {
          return next(err);
      } 

     })
 }

 exports.updateMajor = function(req,res,next)
 {
     User.update({_id:req.body._id},
      {major:config.validator.escape(req.body.major)}
      ,function(err,affected,user){

        if(err)
        {
          err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_UPDATE_DATA);
          return next(err);
        }
       else
        {
           res.json(affected);
        } 

     })  
 
 }

 exports.updateCampus = function(req,res,next)
 {
    var country = "";

      for(var prop in config.campuses)
      {
          if(config.validator.escape(req.body.campus)==prop)
          {
              country = config.campuses[prop];      
          }
      }  
 
     User.update({_id:config.validator.escape(req.body._id)},{campus:config.validator.escape(req.body.campus),country:country},function(err,affected,user){

       if(err)
       {
          err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_UPDATE_DATA);
          return next(err);
       }
      else 
      {
         res.json(country);
      } 

     })
 }

 exports.updateDescription = function(req,res,next)
 {
    User.update({_id:config.validator.escape(req.body._id)},{description:config.validator.escape(req.body.description)},function(err,affected,user){

      if(err)
      {
         err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_UPDATE_DATA);
         return next(err);
      }
     else
      {
         res.json(affected);
      } 

    })
 }

 exports.saveMyInterests = function(req,res,next)
 {

  var myinterest = [];

      User.findOne({_id:config.validator.escape(req.body._id)},function(err,user){

        if(err)
        {
           err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_UPDATE_DATA);
           return next(err);
        }
      else
        {
          var len = req.body.interests.split(",");
          
          for(var i=0;i<len.length;i++)
          {
            myinterest.push(len[i]);
          }

            user.update({interests:myinterest},function(err,affected,user){

              if(err)
              {
                err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_UPDATE_DATA);  
                return next();
              }
            res.json(affected);

          })
        }


      })


 }

