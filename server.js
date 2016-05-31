 require('babel-core/register');
 var swig = require('swig'),
 React = require('react'),
 ReactDOM = require('react-dom/server'),
 Router = require('react-router'),
 mongoose = require('./config/mongoose'),
 express = require('./config/express'),
 config = require('./config');

 var db = mongoose();
 var app = express();

  app.listen(process.env.PORT || 3000,function(){

  console.log('server running...');

  });  