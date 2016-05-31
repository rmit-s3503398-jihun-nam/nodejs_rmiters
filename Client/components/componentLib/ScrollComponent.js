import React from 'react';

/*
*  Simple rendering component showing loading image when scroll down
*  for getting more data
*
*  Usage
*  <ScrollComponent ref="scrollComp"/>
*  using ref, call showLoading when ajax call and	
*  hideLoading when ajax finishes
*
*/

var ScrollComponent = React.createClass({

	showLoading()
	{
		$($(this.refs['ScrollComponent'])[0]).css('visibility','visible');
	},

	hideLoading()
	{
		$($(this.refs['ScrollComponent'])[0]).css('visibility','hidden');
	},

	render()
	{
		return (

			<div ref='ScrollComponent' id="ScrollComponentWrapper">
			  <i className="fa fa-cog fa-spin"></i>
			</div>

			);
	}

});

export default ScrollComponent;