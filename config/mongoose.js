var mongoose = require('mongoose');
var config = require('../config');

module.exports = function(){

 	var db = mongoose.connect(config.db); // connect mongoose db

 	require('../Server/models/user');
 	require('../Server/models/buy');
 	require('../Server/models/accomo');
 	require('../Server/models/Comment');


 	return db;

 }