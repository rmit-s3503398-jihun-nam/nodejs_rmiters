   var userController = require('../controllers/users.controller.js');
   var user = require('mongoose').model("User");

   module.exports = function(app)
   {
   	  app.route('/verify/:id').get(userController.verifyUser);
   }