var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BuySchema = new Schema({

	offerType:{
		type:String,
		trim:true
	},
	title:{
		type:String,
		trim:true
	},
	description:{
		type:String,
		trim:true
	},
	campus:{
		type:String,
		default:null,
		trim:true
	},
	item_location:{
		type:String,
		trim:true
	},
	view_count:{
		type:Number
	},
	post_date:{
		type:Date,
		default:Date.now
	},
	price:{
		type:String
	},
	image:{
		type:Array
	},
	mainImage:
	{
		type:String
	},
	ownerEmail:{
		type:String
	}

});

mongoose.model('Buy',BuySchema);



