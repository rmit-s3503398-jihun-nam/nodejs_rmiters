var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

 var UserSchema = new Schema({

 	f_name:{
 		type:String,
 		trim:true
 	},
 	l_name:{
 		type:String,
 		trim:true
 	},
 	email:{
 		type:String,
 		trim:true
 	},
 	password:{
 		type:String
 	},
 	description:{
 		type:String,
 		trim:true
 	},
 	interests:{
 		type:Array
 	},
 	major:{
 		type:String
 	},
 	subjects:{
 		type:Array
 	},
 	profile_image:{
 		type:String
 	},	
 	campus:{
 		type:String
 	},
 	salt:{
 		type:String
 	},
 	verified:{
 		type:Boolean,
 		default:false
 	},
 	country:{
 		type:String,
 		trim:true
 	},
 	created:{
 		type:Date,
 		default:Date.now
 	}


 });

 UserSchema.pre('save',function(next){

 	if(this.password)
 	{
 		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
 		this.password = this.hashPassword(this.password);
 	}
 
 	next();

 });
 

 UserSchema.methods.hashPassword = function(password)
 {
 	return crypto.pbkdf2Sync(password, this.salt, 10000,64).toString('base64');
 }

 UserSchema.methods.authenticate = function(password)
 {
 	return this.password === this.hashPassword(password);
 }

 mongoose.model('User',UserSchema);