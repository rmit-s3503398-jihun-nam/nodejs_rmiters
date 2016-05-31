import React from 'react';
import RenderForm from './componentLib/RenderForm';
import EachListComponent from './componentLib/EachListComponent'
import ScrollComponent from './componentLib/ScrollComponent';
import LocationComponent from './componentLib/LocationComponent';
 
 var MainAccomoListComponent = React.createClass({

	getInitialState()
	{

  	    /* updateListData is invoked when offerType or LocationComponent changes
  	    *  and update states ,reload lists based on given info  	
  	    */

		return {
			LIMIT_DEFAULT:10,
			SKIP:0,
			TOTAL_NUMBER_LISTS:10,
			for_rent:false,
			look_for:false,
			updateListData:{offerType:[],choosenLocation:localStorage.getItem("country")!="undefined" ? localStorage.getItem("country") : []},
			lists:[]
		} 
	},

	makeNewLists(data)
	{
		var lists = [];	    		
	    lists = data.map(function(list,index){

	    			var title = list.title;
	    			var desc = list.description;
	    			var date = new Date(list.post_date);

	    			if(title.length>70)
	    			{
	    			   title = title.slice(0,70)+"...";
	    			}
	    			
	    			if(desc.length>155)
	    			{
	    			  desc = desc.slice(0,155)+"...";
 					}

	    			return (

	    			<EachListComponent 
	    			key={list._id}
	    			item_obj={list}
	    			address={list._id}
	    			mainImage={list.mainImage}
	    			action="/accomodation"
	    			imageSrc="/uploads/accomodation/thumbs/"
	    			price={list.price}
	    			desc={desc}
	    			title={title}
	    			item_location={list.item_location}
	    			view_count={list.view_count}
	    			post_date={date.toLocaleDateString("en-US")}/>	
 
	    				);
	    		});

		return lists;

	},

	reloadList(SKIP)
	{

	    /*	if refineData is not undefined, use it otherwise use states
	    *	this is for keeping same status when user click browser back button and come back
	    */

		var updateListData = sessionStorage.getItem("AccomodationRefineData") || JSON.stringify(this.state.updateListData);
 
		var self = this;
		var skip = SKIP || 0;
	    $.ajax({

	    	url:"/accomodation/getLists",
	    	type:"POST",
	    	data:{
	    		skip:skip,
	    		updateListData:updateListData
	    	},
	    	dataType:"json",
	    	success:function(data){

	    		if(data.err)
	    		{
	    		    toastr.error(data.err);
	    		    return;
	    		}

	    		var lists = self.makeNewLists(data);

	    		self.setState({
	    			lists:lists
	    		});

	    	}

	    });
	},

	componentWillReceiveProps()
	{
		/* when click http://localhost:3000/buyandsell
		*  it doens't update states by react. 	
		*  call reloadList method in componentWillReceiveProps
		*  this will reload the latest lists
		*/

		this.reloadList();
	},

	/* if browser back and come back, event listener sill stick to the window object.
	*  when it leaves a current component, remove any attached events from window
	*/

	componentWillUnmount()
	{
		window.removeEventListener("scroll",this.addScrollfunction);
	},

	componentDidMount()
	{

		var SessionUpdateListData = sessionStorage.getItem("AccomodationRefineData");
		var offerType;
		var choosenLocation;

		// if session data is available, overwrite it to state.
		// also need to change buy and sell states as well

		if(SessionUpdateListData!=null)
		{
			SessionUpdateListData = JSON.parse(SessionUpdateListData);
			offerType = SessionUpdateListData.offerType;
			choosenLocation = SessionUpdateListData.choosenLocation;
 		    var obj = {};

 		    this.refs["LocationComponent"].updateCheckBoxState(choosenLocation);
 
			for(var i=0;i<offerType.length;i++)
			{
				var offer = offerType[i];
 				obj[offer] = true;
			}
 
			this.setState(obj);

			this.setState({
				updateListData:SessionUpdateListData
			});
		}




		// call first ajax call on arrival 
		this.reloadList();
		
		//add scroll method for getting lists on scroll down
		window.addEventListener("scroll",this.addScrollfunction,false);
	},

	/* get more lists on scrol down
	*  SKIP,TOTAL_NUMBER_LISTS gets bigger as more lists comes from server	
	*/

	addScrollfunction(e)
	{
		var scrollDisplay = this.refs['scrollComp'];
		var TOTAL_NUMBER_LISTS = this.state.TOTAL_NUMBER_LISTS;
		var SKIP = this.state.SKIP;
		var self = this;
			e.preventDefault();
			e.stopPropagation();
 
			if($(window).scrollTop()==$(document).height()-$(window).height())
			{	
				SKIP += self.state.LIMIT_DEFAULT;
				TOTAL_NUMBER_LISTS += self.state.LIMIT_DEFAULT;

				self.setState({
					SKIP:SKIP,
					TOTAL_NUMBER_LISTS:TOTAL_NUMBER_LISTS
				});


				scrollDisplay.showLoading();
				self.getNextLists(SKIP,scrollDisplay.hideLoading);
			}
	},
 
	getNextLists(SKIP,callback)
	{
 
		var new_lists = [];
		var updateListData = sessionStorage.getItem("AccomodationRefineData") || JSON.stringify(this.state.updateListData);
		var self = this;
		var lists = this.state.lists;

		$.ajax({

			url:"/accomodation/getLists",
			type:"POST",
			data:{
				skip:SKIP,
				updateListData:updateListData
			},
			success:function(data){

	    		if(data.err)
	    		{
	    		    toastr.error(data.err);
	    		    return;
	    		}
				 
				 if(data.length==0)
				 {
					 if(typeof callback=='function')
					 {
					 	callback();
					 }

					 return;
				 }

				 if(typeof callback=='function')
				 {
					 callback();
				 }

				 new_lists = self.makeNewLists(data); 
				 lists.push(new_lists);

				 self.setState({
				 	lists:lists
				 })




			},
			fail:function(xhr)
			{
				console.log(xhr);
			}

		});

	},

	updateOfferType(e)
	{


		if(e.target.value=="for_rent")
		{
			 this.setState({
			 	for_rent:!this.state.for_rent
			 });
		}
	  else
	    {
			 this.setState({
			 	look_for:!this.state.look_for
			 })
	    }	

		 if(this.state.updateListData.offerType.indexOf(e.target.value)!=-1 && e.target.checked==false)
		 {
		 	this.state.updateListData.offerType.splice(this.state.updateListData.offerType.indexOf(e.target.value),1);
		 }
		else if(this.state.updateListData.offerType.indexOf(e.target.value)==-1 && e.target.checked==true)
		 {
		 	this.state.updateListData.offerType.push(e.target.value);
		 } 

		 this.updateList({

 	    	    type:"offerType",
 	    		data:this.state.updateListData.offerType
 	    	
 	    	});
 
	},

	updateList(data)
	{
 
		if(data)
		{

		    if(data.type=="location")
		    {
		    	 this.state.updateListData.choosenLocation = data.data
		    }
		   else if(data.type=="offerType")
		   {
		   	      this.state.updateListData.offerType = data.data 
		   } 

	    }


	    /*	when user check any checkboxes , this method will be invoked.
	    *	then set every checkbox info into sessionStorage
	    *   sessionstorage can get only string type, objects or array should be
	    *	stringify 
	    */

	    sessionStorage.setItem('AccomodationRefineData',JSON.stringify(this.state.updateListData));

	   // ajax call for updating list

	   this.reloadList();

	},

	addNewList(data)
	{

		/*  due to server side acync processing,
		*   thumbnail wouldn't be availalbe soon,	
		*	until the new thumbnail is availalbe,
		*   put the logic inside interval
		*/	

		var self = this;

		var dataAvailable = setInterval(function(){

			if(data && data.mainImage)
			{
 
						var lists = self.state.lists;
					    var title = data.title;
					    var desc = data.description;
 	    			var date = new Date(data.post_date);

					    if(title.length>70)
					    {
					       title = title.slice(0,70)+"...";
					    }
					    			
					    if(desc.length>155)
					    {
					       desc = desc.slice(0,155)+"...";
				 	    }

	 /*  tried to make a component for each list.
	  *	 due to key error
	  *	 failed to make it.
	 */			 	    

					    var list = (
					<EachListComponent 
	    			key={data._id}
	    			item_obj={data}
	    			address={data._id}
	    			action="/accomodation"
	    			mainImage={data.mainImage}
	    			imageSrc="/uploads/accomodation/thumbs/"
	    			price={data.price}
	    			desc={desc}
	    			title={title}
	    			item_location={data.item_location}
	    			view_count={data.view_count}
	    			post_date={date.toLocaleDateString("en-US")}/>	);
				 
						lists.unshift(list);

						self.setState({
							lists:lists
						})

				clearInterval(dataAvailable);

			}

		},500);
 

	},

	render()
	{
		return(

		 <div className="MainBuyListWrapper">

		  <div className="col-md-3">
		 	 <div className="refine_wrapper">
		 	 <h5><strong>Offer Type</strong></h5>
	<form role="form">
	  <div className="checkbox checkbox-primary">
	    <input type="checkbox" value="for_rent" onChange={this.updateOfferType} checked={this.state.for_rent} name="for_rent" id="for_rent"/>
	    <label htmlFor="for_rent">
	        For Rent
	    </label>
	  </div>
	  <div className="checkbox checkbox-primary">
	    <input type="checkbox" value="look_for" onChange={this.updateOfferType} checked={this.state.look_for} name="look_for" id="look_for"/>
	    <label htmlFor="look_for">
	        Look For Accomodation
	    </label>
	  </div>	  
	</form>

 			  <LocationComponent ref="LocationComponent" sessionStorageKey="AccomodationRefineData" updateList={this.updateList}/>

		 	 </div>
		 	<button data-toggle="modal" data-target="#myModal" className="post_new_add btn btn-default btn-sm">Post New Ad</button> 
		 </div>	 
		 	 <div className="col-md-9 listsWrapper">{this.state.lists} <ScrollComponent ref="scrollComp"/> </div>

		 </div>

		 );

    }


});



 var AccomoWrapper = React.createClass({

 	getInitialState()
 	{
 		var self = this;
 		return {

 			formField:[
 						   {
 						   	  url:"/accomodation/postnewad",
 						   	  type:"POST",
 						   	  formClass:"AccomoSavePostForm",
 						   	  validateValue:["name","title","description"],
 						   	  success:function(data)
 						   	  {
						    		if(data.err)
						    		{
						    		    toastr.error(data.err);
						    		    return;
						    		}
 						   	  	 self.updateAccomoList(data)
 						   	  },
 						   	  fail:function(data)
 						   	  {
 						   	  	 console.log(data);
 						   	  }
 						   },
							   {
							   	  "label":"Name or Nickname",
							   	  "id":"name",
							   	  "type":"text"
							   },
							   {
							   	  "label":"Post Title",
							   	  "id":"title",
							   	  "type":"text"
							   },
							   {
							   	  "label":"Price (Optional)",
							   	  "id":"price",
							   	  "type":"text"
							   },
							   {
							   	  "label":"Location (Optional)",
							   	  "id":"item_location",
							   	  "type":"text"
							   },
							   {
							   	  "label":"email",
							   	  "id":"email",
							   	  "type":"hidden",
							   	  "value":localStorage.getItem("email")
							   },
							   {
							   	  "label":"campus",
							   	  "id":"campus",
							   	  "type":"hidden",
							   	  "value":localStorage.getItem("campus")!="undefined" ? localStorage.getItem("campus") : ""
							   },
							   {
							   	  "label":"description",
							   	  "id":"description",
							   	  "type":"textarea",
							   	  "rows":5
							   },
							   {
							   	  "label":"offerType",
							   	  "id":"offerType",
							   	  "text":[
							   	  	 {
							   	  	 	title:"For Rent",
							   	  	 	name:"offerType",
							   	  	 	value:"for_rent",
							   	  	 	checked:true
							   	     },

							   	  	 {
							   	  	 	title:"Look for Accomodation",
							   	  	 	name:"offerType",
							   	  	 	value:"look_for",
							   	  	 	checked:false
							   	  	 }

							   	  ],	
							   	  "type":"radio"
							   },
							   {
							   	  "label":"Upload Images",
							   	  "type":"file",
							   	  "maxFileNumber":5,
							   	  "maxFileSize":"200000",
							   	  "fileType":["image/jpg","image/jpeg","image/png","image/gif"]
							   },
							   {
							   	  "type":"button",
							   	  "buttonText":"Save Post"
							   },							   							   
					

					]

 		}
 	},

 	updateAccomoList(data)
 	{
 		this.refs['mainList'].addNewList(data);
 	},

 	closeModal()
 	{
 		$("#myModal").modal('hide');
 	},

 	render()
 	{
 		return(

 			<div className="col-md-12" id="BuyWrapper">
 			  <MainAccomoListComponent ref="mainList" />


      <div>
 
        <div className="modal fade" id="myModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="myModalLabel">Post an ad</h4>
              </div>
              <div className="modal-body">
                	
                 <RenderForm callBack="true" handleData={this.closeModal} formData={this.state.formField}/> 	

              </div>
            </div>
          </div>
        </div>
      </div>



 			</div>

 			);
 	}

 })


 var Accomodation = React.createClass({

 	render()
 	{
		var sideMenu = $(".sideMenu").width();
		var padding = 55;
 
		if(sideMenu==null || sideMenu==230)
		{
			padding = 230;
		}

		return(

		  <div id="wrapper">	
 
     		   <div style={{paddingLeft:padding}} className="home_wrapper">
		     <div className="container-fluid"> 
			     <div className="row home_wrapper2 profile_container">
					
		 				<AccomoWrapper/>

					</div>

	 			 </div>
 			 </div>
 					 </div>
 
		 
			)
	}

 	});

 export default Accomodation;