
/*
	usage:
	use with dependancy ButtonComponent 


<RenderForm callBack="true" handleData={this.updateBuyList} formData={this.state.formField}/> 
	
1.callback attr - trigger callback function after form submit	
2.handleData - will be tirggered if callback attr is true
3.formData - provide json format for form fields

		formField:[
 						   {
 						   	  url:"buyandsell/newPost",
 						   	  type:"POST",
 						   	  formClass:"SavePostForm",
 						   	  validateValue:["name","email"],
 						   	  success:function(data)
 						   	  {
 						   	  	 console.log(data);
 						   	  },
 						   	  fail:function(data)
 						   	  {
 						   	  	 console.log(data);
 						   	  }
 						   },
							   {
							   	  "label":"name",
							   	  "type":"input",
							   	  "inputType":"text",
							   },

							   {
							   	  "label":"email",
							   	  "type":"input",
							   	  "inputType":"text",
							   },
							   {
							   	  "label":"description",
							   	  "type":"textarea",
							   	  "rows":5
							   },
							   {
							   	  "label":"offerType",
							   	  "text":[

							   	  	 {
							   	  	 	title:"Buy",
							   	  	 	name:"BUY",
							   	  	 	value:"buy",
							   	  	 	checked:false
							   	  	 },
							   	  	 {
							   	  	 	title:"Sell",
							   	  	 	name:"BUY",
							   	  	 	value:"sell",
							   	  	 	checked:true
							   	  	 }

							   	  ],	
							   	  "type":"radio"
							   },
							   {
							   	  "label":"Upload Images",
							   	  "type":"file",
							   	  "maxFileNumber":5,
							   	  "maxFileSize":"100000",
							   	  "fileType":["image/jpg","image/jpeg","image/png","image/gif"]
							   },
							   {
							   	  "type":"button",
							   	  "buttonText":"Save Post"
							   },							   							   
					

					]

 		}    


*/

import React from 'react';
import {Link} from 'react-router';
import ButtonComponent from './ButtonComponent';
var RenderForm = React.createClass({

	getInitialState()
	{
		return {
			formData:new FormData(),
			formInfo:{},
			formUrl:"",
			formFieldData:[],
			formClass:"",
			thumbnails:"",
			validFileTypes:[],
			fileError:false,
			validateValue:[],
			overSizedFiles:[],
			invalidFileTypes:[],
			filesWillUpload:[],
			totalFileNumber:0,
			mainThumbnail:"",
			maxFileSize:0,
			maxFileNumber:0,
			errorList:"",
			invalidErrorList:"",
			ajaxSuccess:"",
			ajaxFail:""
		}
	},

	componentDidMount()
	{		

		var formInfo = this.props.formData.shift();
		
		this.setState({
			formUrl:formInfo.url,
			ajaxSuccess:formInfo.success,
			ajaxFail:formInfo.fail
		});

		var formFieldData = this.props.formData;

		for(var i=0;i<formFieldData.length;i++)
		{
			if(formFieldData[i].type=="file")
			{
				this.setState({
					maxFileNumber:formFieldData[i].maxFileNumber,
					validFileTypes:formFieldData[i].fileType
				})

				break;
			}
		}

		this.setState({
			formInfo:formInfo,
			formFieldData:formFieldData,
			formClass:formInfo.formClass,
			validateValue:formInfo.validateValue
		})	
        
	},

	sendData(e)
	{
		e.preventDefault();
 
		var validateEmail = function(email) {
		    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		};

		var form = $("."+this.state.formClass);
		var addEvents = form.find("input,textarea");
		var formValid = true;
		var fileError = this.state.fileError;
		var self = this;
		
		for(var i=0;i<addEvents.length;i++)
		{
			(function(i){

				addEvents[i].addEventListener("keypress",function(){

				    $(addEvents[i]).parent().removeClass("has-error");

				});

			})(i)
		}

		var formValues = form.serializeArray();	

		for(var i=0;i<formValues.length;i++)
		{
			if(formValues[i].value=="")
			{
				if(this.state.validateValue.indexOf(formValues[i].name)!=-1)
				{
				    form.find("#"+formValues[i].name).parent().addClass("has-error");
				    formValid = false;
				}
			}

		   if(formValues[i].name=="email")
		   {
			  if(!validateEmail(formValues[i].value))
			  {
			  	  form.find("#"+formValues[i].name).parent().addClass("has-error");
			  	  formValid = false;
			  }
		   }

		}
 
 		if(this.state.overSizedFiles.length>0)
 		{
 			fileError = true;
 		}
 	  else
 	    {
 	    	fileError = false;
 	    }	
 
		if(formValid == false || fileError == true)
		{
			return false;
		}
 
		 for(var i=0;i<formValues.length;i++)
		 {
		 	 this.state.formData.append(formValues[i].name,formValues[i].value);
		 }

		 var updatedfilesWillUpload = [];

		 this.state.filesWillUpload.forEach(function(val){
		 	updatedfilesWillUpload.push(val.substring(0,val.lastIndexOf("_")));
		 })
 
		 this.state.formData.append("filesWillUpload",updatedfilesWillUpload);
		 this.state.formData.append("mainThumbnail",this.state.mainThumbnail);

		this.refs["ButtonComponent"].disableButton();

		$.ajax({

			url:this.state.formUrl,
			type:"POST",
			data:this.state.formData,
	        cache: false,
	        contentType: false,
	        processData: false,
	        success:function(data)
	        {
	        	self.state.ajaxSuccess(data);
	        	self.refs["ButtonComponent"].ableButton();
	        },
	        fail:function(data)
	        {
	        	self.state.ajaxFail(data);
	        }

		})


		// execute a callback function or not
		if(this.props.callBack=="true")
		{
			this.props.handleData();
		}
		
	},

	dragEnter(e)
	{
		e.stopPropagation();
		e.preventDefault();
	},

	dragOver(e)
	{
		e.stopPropagation();
		e.preventDefault();
	},

	filehandling(files)
	{
		var overSizedInvalid = false;
		var overSizedFiles = this.state.overSizedFiles;
		var invalidFileTypes = this.state.invalidFileTypes;
		var invalidFileType = false;
		var maxFileSize = 0;
		var totalFileNumber = this.state.totalFileNumber;
		var maxFileNumber = this.state.maxFileNumber;
		var filesWillUpload = this.state.filesWillUpload;
		var currentTime = Date.now();

		for(var i=0;i<files.length;i++)
		{
			for(var j=0;j<this.props.formData.length;j++)
			{
				if(this.props.formData[j]["type"]=="file")
				{
					if(this.props.formData[j].fileType.indexOf(files[i].type)==-1)
					{

						if(maxFileNumber>totalFileNumber)
						{		
							invalidFileType = true;
						    invalidFileTypes.push({name:files[i].name,type:files[i].type,key:files[i].name+"_"+currentTime});
						}	
						break;
					}

					if(this.props.formData[j].maxFileSize<files[i].size)
					{
						if(maxFileNumber>totalFileNumber)
						{
							maxFileSize = this.props.formData[j].maxFileSize;
							overSizedInvalid = true;
							overSizedFiles.push({name:files[i].name,size:files[i].size,key:files[i].name+"_"+currentTime});		
							
							filesWillUpload.push(files[i].name+"_"+currentTime);
							this.renderThumbnails(files[i],totalFileNumber,files[i].name+"_"+currentTime);	
							totalFileNumber++;
						   this.setState({

						   	  filesWillUpload:filesWillUpload,
						   	  totalFileNumber:totalFileNumber

						   })


						}
						break;
					}

 					   if(maxFileNumber>totalFileNumber)
 					   {
 					   	   filesWillUpload.push(files[i].name+"_"+currentTime);
	 					   this.renderThumbnails(files[i],totalFileNumber,files[i].name+"_"+currentTime);		
						   this.state.formData.append("file",files[i]);
						   
						   // limit max file numbers for formdata

						   totalFileNumber++;
						   this.setState({

						   	  filesWillUpload:filesWillUpload,
						   	  totalFileNumber:totalFileNumber

						   })

					   }
				}		
			}			

		}
 
		if(overSizedInvalid==true)
		{

		    this.state.errorList = overSizedFiles.map(function(filename,index){

		    	return (

		    		<div id={filename.name} className="alert alert-danger" key={filename.key}>
		    		  <strong>{filename.name}</strong>
		    		  <span> filesize is {filename.size/1000}KB Max file size not more than {maxFileSize/1000} KB</span>
		    		</div>

		    		);

		    });

		    this.setState({
		    	fileError:true
		    })
		}
 
		if(invalidFileType==true)
		{
			this.state.invalidErrorList = invalidFileTypes.map(function(filename,index){

		    	return (

		    		<div id={filename.name} className="alert alert-danger" key={filename.key}>
		    		  <strong>{filename.name}</strong>
		    		  <span> {filename.type} is invalid filetype.</span>
		    		</div>

		    		);

		    })

		    this.setState({
		    	fileError:true
		    })

		}
	},

	drop(e)
	{
		e.stopPropagation();
		e.preventDefault();
 
		var dt = e.dataTransfer;
		var files = dt.files;

		this.filehandling(files);
		
	},

	renderThumbnails(file,totalFileNumber,fileName)
	{
		var thumbnails = $("#dropzone").find("img");
		var maxFileNumber = this.state.maxFileNumber;
			var img = document.createElement("img");
				img.classList.add("buyThumnail");
				img.classList.add("fadeInUp");
				img.classList.add("animated");
				img.name = fileName;
				img.file = file;		

			var self = this;
 			var wrapper = $("<div style='margin-bottom:15px'><button style='margin-right:5px;' class='btn btn-info btn-sm' id=deleteThumnail_"+img.name+">Delete</buttun></div>");

			/**
			*  only valid images can be a main photo
			*/
 
			var mainThumbnail_false = false;	

			for(var i=0;i<self.state.overSizedFiles.length;i++)
			{
				if(self.state.overSizedFiles[i].key==img.name)
				{
					mainThumbnail_false = true;
					break;
				}
			}

			if(mainThumbnail_false==false)
			{
 				wrapper.append("<button class='btn btn-info btn-sm mainThumbnail_"+img.name+"'>Main photo</button>");
			}

 			wrapper.prepend(img);
 
 				 if(maxFileNumber>totalFileNumber)
 				 {	
				    $("#dropzone").append(wrapper);
				 }

			if(document.getElementById("deleteThumnail_"+img.name)!=undefined)
			{	 

	  			document.getElementById("deleteThumnail_"+img.name).addEventListener("click",function(e){

	  				 e.preventDefault();
	  				 e.stopPropagation();

	 				self.deleteThumnail($(e.target).parent().find("img")[0]);
	 				$(e.target).parent().remove();

	 			});

  		 	}

			/**
			*  check if element is undefined or not before attach to event
			*/

  			if(document.getElementsByClassName("mainThumbnail_"+img.name)[0]!=undefined)
  			{
	  			document.getElementsByClassName("mainThumbnail_"+img.name)[0].addEventListener("click",function(e){

	  				 e.preventDefault();
	  				 e.stopPropagation();

	  				 $("#dropzone").find("img").each(function(index,element){

	  				 	$(element).css({
	  				 		"border": "none"
	  				 	});

	  				 });

	  				 var img = $(e.target).parent().find("img")[0];
	  				 $(img).css({
	  				 	"border": "2px solid #269abc"
	  				 })

	  				 self.setState({

	  				 	mainThumbnail:img.name.substring(0,img.name.lastIndexOf("_"))

	  				 });

	  			});
  	    	};


			var reader = new FileReader();
 
			reader.onload = (function(aImg){
				return function(e)
				{
					aImg.src=e.target.result;
				};
			})(img);
			reader.readAsDataURL(file);


		$(".buyThumnail").on("mouseover",function(e){

			e.preventDefault();
			e.stopPropagation();

 			$(this).removeClass("fadeInup");
 			$(this).removeClass("animated");

 			$(this).animate({
 				opacity:0.5
 			},500);

		});

		$(".buyThumnail").on("mouseleave",function(e){

			e.preventDefault();
			e.stopPropagation();

 			$(this).animate({
 				opacity:1.0
 			},500);
 
 			$(this).addClass("fadeInup");
 			$(this).addClass("animated");


		});




	},

	deleteThumnail(target)
	{

 			 $(target).remove();

 			var self = this;
 			var totalFileNumber = self.state.totalFileNumber;  
			var removeFile = false;
			var erroList = self.state.errorList;
			var filesWillUpload = self.state.filesWillUpload;

			for(var i=0;i<filesWillUpload.length;i++)
			{
				if(filesWillUpload[i]==target.name)
				{
					filesWillUpload.splice(i,1);
				
					self.setState({
						filesWillUpload:filesWillUpload
					})

					break;
				}
			}

			for(var i=0;i<erroList.length;i++)
			{
				 if(erroList[i].key==target.name)
				 {
				 	erroList.splice(i,1);
				 }
			}

			self.setState({
				erroList:erroList
			})
 
			for(var i=0;i<self.state.overSizedFiles.length;i++)
			{
				if(self.state.overSizedFiles[i].key==target.name)
				{
					self.state.overSizedFiles.splice(i,1);
				}
			}

			for(var i=0;i<self.state.invalidFileTypes.length;i++)
			{
				if(self.state.invalidFileTypes[i].key==target.name)
				{
					self.state.invalidFileTypes.splice(i,1);
				}
			}

 
			totalFileNumber--;	

			 self.setState({

			 totalFileNumber:totalFileNumber

			 })		

	},	

	fileInserted(e)
	{
		e.preventDefault();
		this.filehandling(e.target.files);
	},

	linkButtonClicked(e)
	{
		e.preventDefault();
		$("#hiddenButton").click();
	},

	resetState()
	{
		this.setState({
			formData:new FormData(),
			filesWillUpload:[],
			mainThumbnail:"",
			totalFileNumber:0
		})

		$(this.refs["myForm"])[0].reset();
		$("#dropzone").empty();
	},
	
	render()
	{ 
		var self = this;
		var form = this.state.formFieldData.map(function(field,index){

				switch(field.type)
				{
					case "text":
					return (
					<div key={index} className="form-group">
					  <label htmlFor={field.label}>{field.label}</label>	
					  <input className="form-control" name={field.id} type={field.type} id={field.id}/>
					</div>
					);
					break;
					case "hidden":
					return (
					<div key={index} className="form-group">
					  <input className="form-control" name={field.id} type={field.type} value={field.value} id={field.id}/>
					</div>
						);
					break;
					case "textarea":
					return (
						<div key={index} className="form-group">
						  <label htmlFor={field.label}>{field.label}</label>
						  <textarea className="form-control" name={field.id} rows={field.rows} id={field.id}/>
						</div>
						);
					break;
				    case "button":
				    return (
				    	<div key={index} className="form-group">
				    	 <ButtonComponent ref="ButtonComponent" callback="true" callbackAction={self.resetState} action={self.sendData} txt={field.buttonText} disabledTxt="Uploading "/>
				    	</div> 
				    	);
				    break;
				    case "radio":

				      var radio_buttons = field.text.map(function(radio,index){

				      	return (

				      		<div key={index} className="form-group radio radio-primary">
							    <input type="radio" defaultChecked={radio.checked} value={radio.value} name={radio.name} id={radio.name}/>
							        <label htmlFor={radio.name}>
							        	{radio.title}
							        </label>
				      		</div>
				      		);


				      })

				      return (
				      <div key={index}>
				        <label htmlFor={field.label}>{field.label}</label>
				        {radio_buttons}
				      </div>
				      );

				      case "file":

				      return (
				      <div key={index}>	
				        <label htmlFor={field.label}>{field.label} (Max file size not more than {field.maxFileSize/1000} KB,Max files per post is {field.maxFileNumber})</label>
				      	
				      	<div 
				      	onDragEnter={self.dragEnter} 
				      	onDragOver={self.dragOver}
				      	onDrop={self.drop}
				      	id="dropbox">
				      	<Link id="dropfileLinkButton" to="#" onClick={self.linkButtonClicked}>
             	<div id="dropzone"></div>
                  <h5 className="dropbox_title">Drop files or click here</h5>
				      	</Link>	
				      	<input id="hiddenButton" className="btn btn-primary" type="file" onChange={self.fileInserted} multiple="true"/>
				      	</div>
				      	<span id="errMsg">{self.state.errorList}</span>
				      	<span id="inValiderrMsg">{self.state.invalidErrorList}</span>
				      </div>	
				      	)
				}

		})


		return (

			<form ref="myForm" className={this.state.formClass}>
			  {form}
			</form>

			);
	}



});

export default RenderForm;