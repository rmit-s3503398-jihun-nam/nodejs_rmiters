var mongoose = require("mongoose");
var Accomdation = mongoose.model("Accomdation");
var swig = require('swig');
var multer = require('multer');
var fs = require("fs");
var helper = require('../lib/helper');
var config = require('../../config');
var easyimg = require('easyimage');
var storage = multer.diskStorage({
  destination:function(req,file,callback)
  {
     callback(null,'./public/uploads/accomodation');
  },
  filename:function(req,file,callback)
  {
     var fileName = helper.makeFileName(file.originalname);		
 
     callback(null,fileName);
  } 
});

var upload = multer({storage:storage}).any();

 
 exports.render = function(req,res,next)
 {
      var page = swig.renderFile('views/index.html');
      res.status(200).send(page);
 }
 

 /* get lists from mongoDB
 *	limit is default 10 or get the number from client when call through ajax
 *  req.body might have specific offertype and location 
 */

 exports.getLists = function(req,res,next)
 {
 	
 	// refineData - if client side wants to send array data to server, JSON.stringify() should be used
 	// and parse with JSON.parse
 	// catch error if refineData is null;

 	var refineData;

 	try{
 		refineData = JSON.parse(req.body.updateListData);
 	}
   catch(e)
   {
   	  e = config.InsertClientErrMessage(e,config.ClientErrorMessages.FAIL_LOAD_DATA);
   	  return next(e);
   }	

	var offerType = (refineData.offerType.length>1) ? null : refineData.offerType[0];
	var choosenLocation = refineData.choosenLocation;
	var offerTypeData = {};
	var refinedCampues = [];

  /* Mongoose find() mehtod can have a object parameter
  *  single object can't have the same paramter name
  *	 if null is passed, all data will be fetched
  *  otherwise specific value will be passed and return data
  */
 
	if(offerType==null || offerType==undefined)
	{
		offerType = null;
	}

	if(offerType!=null)
	{
		offerTypeData.offerType = offerType;
	}

  /* if user set Australia campus, choosenLocation will be string type value aus
  *  in this case loop through all Australia campuses from config file 
  *	 and push into an array
  *  Mongoose "or" method need an array of objects
  *  "or" method doesn't accept empty array or null
  */

    if(typeof choosenLocation == 'string' && choosenLocation == config.countries.AUS)
    {
    	var i = 0;

    	for(var prop in config.campuses)
    	{
    		if(config.campuses[prop]==config.countries.AUS)
    		{
	    		refinedCampues[i] = {campus:prop};
	    		i++;
    		}
    	}
    }
  else if(typeof choosenLocation == 'string' && choosenLocation == config.countries.VIETNAM)   
  {
  	  refinedCampues.push({campus:config.countries.VIETNAM});
  }

  /* client side checkboxes are checked.
  *  Mongoose "or" method need an array of objects
  */

    if(typeof choosenLocation == 'object' && choosenLocation != null)
    {
    	for(var i=0;i<choosenLocation.length;i++)
    	{
    		refinedCampues[i] = {campus:choosenLocation[i]};
    	}
    }

  /* if refinedCampus length is 0,
  *  user doesn't set campus on profile
  *  render every data
  */

    if(refinedCampues.length==0)
    {
    	var i = 0;

    	for(var prop in config.campuses)
    	{
	       refinedCampues[i] = {campus:prop};
	       i++;
    	}
    }
 
 	var accomodationListLimit = req.body.limit || config.accomodationListLimit;
 	var skip = req.body.skip || 0;

 	 Accomdation.find(offerTypeData,function(err,lists){

 	 	if(!err)
 	 	{
 	 		res.json(lists);
 	 	}
 	   else 
 	    {
 	    	err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_LOAD_DATA);
 	    	return next(err);
 	    }	

 	 }).sort({"post_date":"desc"}).skip(skip).limit(accomodationListLimit).or(refinedCampues);
 }

 /*  Upload new post to server
 *   multer function does save files on server first then can access req.body object 	
 *   save all the formdata from browser first and then delete unwanted files
 */

 exports.postNewAd = function(req,res,next)
 {
	upload(req,res,function(err){

	if(err)
	{	
		err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_IMAGE_UPLOAD);		
		return next(err);
	}

	var filesWillUpload = [];
	var filter = [];
	var mainImage = "";
	var userEmail = req.body.email;
 
		for(var i=0;i<req.files.length;i++)
		{
			if(req.body.filesWillUpload.indexOf(req.files[i].originalname)!=-1 && filter.indexOf(req.files[i].originalname)==-1)
			{
 
				filesWillUpload.push(req.files[i].filename);
				filter.push(req.files[i].originalname);
 	

easyimg.resize({
     src:'./public/uploads/accomodation/'+ req.files[i].filename, 
     dst:'./public/uploads/accomodation/thumbs/'+ req.files[i].filename,
     width:120, height:120,
     ignoreAspectRatio:true
  }).then(
  function(image) {
    
  },
  function (err) {
    if(err)
	{	
		return next(err);
	}
  }
);

			}
		  else
		    {
		    	fs.unlink(req.files[i].path,function(err){
		    		if(err)
		    		{
		    			return next(err);
		    		}
		    	})
		    }	

			if(req.body.mainThumbnail==req.files[i].originalname && req.body.filesWillUpload.length>0)
			{
				mainImage = req.files[i].filename;
			}

		}

	/* check mainimage has been chosen 
	*  otherwise set default one from config.buyandsellDefaultImage
	*/ 

	if(mainImage=="" || (filesWillUpload.length>0 && filesWillUpload.indexOf(mainImage)==-1))
	{
		if(filesWillUpload.length>0)
		{
			mainImage = filesWillUpload[0];
		}
	  else
	    {
	    	mainImage = config.accomodationDefault;
	    }	
	}

	var accomo = new Accomdation({

		offerType:req.body.offerType,
		title:config.validator.escape(req.body.title),
		description:config.validator.escape(req.body.description),
		campus:req.body.campus,
		item_location:config.validator.escape(req.body.item_location),
		view_count:0,
		price:config.validator.escape(req.body.price),
		image:filesWillUpload,
		mainImage:mainImage,
		ownerEmail:userEmail

	});  		
 
	 accomo.save(function(err){

	 	if(err)
	 	{
			err = config.InsertClientErrMessage(err,config.ClientErrorMessages.FAIL_POST_NEW_DATA);	 		
	 		return next(err);
	 	}

	 	return res.json(accomo);

	 })
	 


	})

 }