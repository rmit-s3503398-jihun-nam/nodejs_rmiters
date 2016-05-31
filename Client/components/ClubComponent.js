import React from 'react';
import lib from '../lib/lib';

var ClubComponent = React.createClass({

	componentWillMount()
	{
		$.ajax({

			url:"/clubs/test",
			type:"POST",
			data:{
				name:"rmit_tennis"
			},
			success:function(data){
				console.log(data);
			}

		});
	},

	render(){

		return(
 
			<div>Hello</div>
 	   )

	}

});

export default ClubComponent;