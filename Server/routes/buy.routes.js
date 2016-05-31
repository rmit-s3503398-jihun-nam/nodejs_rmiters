var buyController = require('../controllers/buy.controller');
var ItemController = require('../controllers/item.controller');

module.exports = function(app)
{
	app.route('/buyandsell').get(buyController.render);
	app.route('/buyandsell/:id').get(buyController.render);
	app.route('/buyandsell/postnewad').post(buyController.postNewAd);
	app.route('/buyandsell/getLists').post(buyController.getLists);
   
    app.route('/getEachItem').post(ItemController.getEachItem);
 
}