var userController = require('../controllers/users.controller');
var userProfileController = require('../controllers/userProfile.controller');
var user = require('mongoose').model('User');
var swig = require('swig');
var auth = require('../lib/auth');
 
module.exports = function(app)
{
	app.route('/').get(userController.render);

	app.route('/signup')
	.post(userController.create)
	.get(userController.render);

	app.route('/signin')
	.post(userController.signin)
	.get(userController.render);

	app.route('/profile')
	.get(userController.render);

	app.route('/profile/updateSubject')
	.post(userController.updateSubject);

	app.route('/profile/uploadProfileImage')
	.post(userController.updateProfileImage);

	app.route('/profile/updateMajor')
	.post(userController.updateMajor);

	app.route('/profile/updateCampus')
	.post(userController.updateCampus);

	app.route('/profile/updateDescription')
	.post(userController.updateDescription);

	app.route('/profile/saveMyInterests')
	.post(userController.saveMyInterests);

	app.route('/userProfile/:id').get(userController.render);
	app.route('/userProfile/getUser').post(userProfileController.getUser);

	app.route('/verify_token')
	.post(auth.verify_token);

}