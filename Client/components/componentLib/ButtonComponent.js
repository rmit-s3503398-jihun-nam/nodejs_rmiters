

/*
	usage:
	<ButtonComponent ref="ButtonComponent" 
	callback="true" 
	callbackAction={this.resetState} 
	action={self.sendData} 
	txt={field.buttonText}/>
	disabledTxt="Uploading"

	1. action attr is for trriger from button 
	2. ref needs to be for reference.
	3. callback - callbackaction will be triggered if this is true
	4. disabledTxt - render when the button is disabled

*/

import React from 'react';
var ButtonComponent = React.createClass({

	ableButton()
	{
		var button = this.refs["myButton"];
		
		$(button).html(this.props.txt);
		$(button).attr("disabled",false);
		$(button).find("i").remove();

		if(this.props.callback=="true")
		{
			this.props.callbackAction();
		}

	},

	disableButton()
	{
		var button = this.refs["myButton"];
		$(button).html(this.props.disabledTxt);
		$(button).append("<i class='fa fa-cog fa-spin'></i>");
		$(button).attr("disabled",true);
	},

	render()
	{
		return (

			<button id="ButtonComponentID" ref="myButton" onClick={this.props.action} className="btn btn-primary">{this.props.txt}</button>

			);
	}	


});


export default ButtonComponent;