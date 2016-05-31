 import React from 'react';
 import ClientSideInfo from '../../lib/ClientSideInfo';

 /*  Usage 
 *	it renders campus locations based on students campus location
 *	whenever checkbox value changes, it invoke a function provided by its parent component
 *	need to work with sessionStorage data sessionStorage key has to be on parent component
 *    eg) <LocationComponent ref="LocationComponent" sessionStorageKey="BuyandSellrefineData" updateList={this.updateList}/>
 *  each page has to pass different sessionStorageKey eg) buyandsell and accomodation
 */

 var AUS_CAMPUS = ClientSideInfo.CAMPUS_INFO.AUS_CAMPUS;
 var VIETNAM = ClientSideInfo.CAMPUS_INFO.VIETNAM;
 
 var LocationComponent = React.createClass({

    getInitialState()
    {

    	var country = localStorage.getItem("country")!="undefined" ? localStorage.getItem("country") : null;
    	var campuses = [];


    	if(country!=null)
    	{
    		if(country==ClientSideInfo.COUNTRIES.AUS)
    		{
    			campuses = AUS_CAMPUS;
    		}
    	  else if(country==ClientSideInfo.COUNTRIES.VIETNAM)
	    	{
	    		campuses = VIETNAM;
	    	}	
    	}

    	return {

    		myCampus:"",
    		everyCampus:campuses,
    		choosenLocation:[]

    	}
    },

    componentDidMount()
    {
        /* if sessionStorage key from this.props available keep update states
        */

    	if(sessionStorage.getItem(this.props.sessionStorageKey)!=null)
    	{
    		var CAMPUSES = [];
    		var choosenLocation = JSON.parse(sessionStorage.getItem(this.props.sessionStorageKey)).choosenLocation;

    		if(typeof choosenLocation=='string' && choosenLocation!=ClientSideInfo.COUNTRIES.AUS)
    		{
    			CAMPUSES.push(choosenLocation); // vietnam
    		}
    	  else if(typeof choosenLocation=='object')
    	  {
    	  	 for(var i=0;i<choosenLocation.length;i++)
    	  	 {
    	  	 	CAMPUSES.push(choosenLocation[i]); // aus campuses
    	  	 }
    	  }	

    		this.setState({
    			choosenLocation:CAMPUSES
    		});

    	}


    	var myCampus = localStorage.getItem("campus")!="undefined" ? localStorage.getItem("campus") : "" ;

    	if(myCampus!="")
    	{
	    	this.setState({

	    		myCampus:myCampus

	    	});
    	}

    },

    /* this would be working with sessionStorage
    *  need to keep current checkbox status 
    *  when page reloaded and data is updated based on sessionStorage data
    */

    updateCheckBoxState(data)
    {
    	if(typeof data=="object") //if array given, loop through everything and update 
    	{     	
    		var CAMPUSES = this.state.everyCampus; 

    		for(var i=0;i<data.length;i++)
    		{
    			for(var j=0;j<CAMPUSES.length;j++)
    			{
    				if(CAMPUSES[j].city==data[i])
    				{
    					CAMPUSES[j].checked = true;
    				}
    			}
    		}

    		this.setState({
    			everyCampus:CAMPUSES
    		});
    	}
      else if(typeof data=="string") //if string given, match its campus name and update 
      {  
      	  var CAMPUSES = this.state.everyCampus; 

    			for(var j=0;j<CAMPUSES.length;j++)
    			{
    			    CAMPUSES[j].checked = false;
    			}

    		this.setState({
    			everyCampus:CAMPUSES
    		});

      }	
    },

    /* individual campus like VIETNAM doens't call this method
    *  if this is invoked, only AUS campuses 
    */

    changeLocation(e)
    {
 
 		e.stopPropagation();
 
 		var city = e.target.id;
 
 		for(var i=0;i<AUS_CAMPUS.length;i++)
 		{
 			if(AUS_CAMPUS[i].city==city)
 			{
 				AUS_CAMPUS[i].checked = !AUS_CAMPUS[i].checked;
 			}
 		}

 		this.setState({
 			everyCampus:AUS_CAMPUS
 		})


 		if(e.target.checked==true)
 		{
	 	    	this.state.choosenLocation.push(city);
 	    }	
 	  else
 	   {
	 			this.state.choosenLocation.splice(this.state.choosenLocation.indexOf(city),1);
 	   }

 	   if(this.state.choosenLocation.length == 0) // this means choosen location is one of AUS campuses
 	   {
	 	        this.props.updateList(
	 	    	{
	 	    	    type:"location",
	 	    		data:ClientSideInfo.COUNTRIES.AUS
	 	    	}
	 	    	);

	 	    	return;
 	   }
 
 	    this.props.updateList(
 	    	{
 	    	    type:"location",
 	    		data:this.state.choosenLocation
 	    	}
 	    	);
 
    },

 	render()
 	{
 		var self = this;
 		var everyCampus = this.state.everyCampus.map(function(campus,index){
 
 			return( 			  
 			  <div key={campus.city} className="checkbox checkbox-primary">
			    <input checked={campus.checked} onChange={self.changeLocation} type="checkbox" name={campus.city} id={campus.city}/>
			    <label htmlFor={campus.city}>
			        {campus.city}
			    </label>
			  </div>
			  );

 		});


    	/* need to detect if user set his campus or not
    	*  if not don't show any capmus checkboxes
    	*/

 		if(this.state.myCampus)
 		{

	 		return(

	 			<div className="locationWrapper"><h5><strong>Campus Location</strong></h5>

			<form role="form">
			
			{
			 (everyCampus.length>1) ? everyCampus :  			  
			  <div className="checkbox checkbox-primary">
			    <input readOnly="true" checked="checked" type="checkbox" name={this.state.myCampus} id={this.state.myLocation}/>
			        <label htmlFor={this.state.myCampus}>
			        	{this.state.myCampus}
			        </label>
			  </div>
			}	
					  
			</form>

	 			</div>

	 			);
 		}
 	  else
 	    {
 	    	return (

 	    		<div></div>

 	    		);
 	    }	

 	}


 });

 export default LocationComponent;