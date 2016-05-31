
/* renders each list link based on attrs 
*
*  usage	
    var list = (
	  <EachListComponent 
	   key={data._id}
	   mainImage={data.mainImage}
	   price={data.price}
	   desc={desc}
	   title={title}
	   item_location={data.item_location}
	   view_count={data.view_count}
	   post_date={date.toLocaleDateString("en-US")}/>	);
*/

import React from 'react';
import {Link} from 'react-router';
var EachListComponent = React.createClass({
 
  renderEachItem(e)
  {
  	  var item_obj = JSON.stringify(this.props.item_obj);

  	  sessionStorage.setItem('item_obj',item_obj);
  },

  render()
  {
 
  	  return(

	    			  <Link onClick={this.renderEachItem} className="fadeInUp animated" key={this.props.key} to={this.props.action+"/"+this.props.address}>
	    				<li className="buyandsell_list clearfix">
	    				  <div>
	    				    <img className="image_thumbnail" src={this.props.imageSrc + this.props.mainImage}/>
		    				  	<div className="buyandsellEachList">
		    				  		<h4>{this.props.title}</h4>
			    				  	<p>{this.props.desc}</p>
		    				  	</div>
		    				  	<div className="buyandsellEachList2">
			    				  	<strong><span className="price">{this.props.price!=""?"$"+this.props.price:""}</span></strong>			    				  	
			    				  	<span className="item_location">{this.props.item_location}</span>
			    				  	<span className="view_count"><i className="fa fa-eye"></i> View {this.props.view_count}</span>
			    				  	<span className="post_date">{this.props.post_date}</span>
		    				  	</div>
	    				  </div>	
	    				</li>
	    			  </Link>


  	  	);

  }


});


export default EachListComponent;