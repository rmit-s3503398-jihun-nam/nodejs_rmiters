var commentController = require('../controllers/comment.controller');

module.exports = function(app)
{
	app.route('/replyComment').post(commentController.replyComment);
	app.route('/getComments').post(commentController.getComments);
	app.route('/update_comment').post(commentController.update_comment);
}