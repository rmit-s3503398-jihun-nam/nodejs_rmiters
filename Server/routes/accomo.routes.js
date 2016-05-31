var AccomodationController = require('../controllers/accomo.controller');

 module.exports = function(app)
 {
    app.route('/accomodation').get(AccomodationController.render); 	
    app.route('/accomodation/:id').get(AccomodationController.render);
	app.route('/accomodation/postnewad').post(AccomodationController.postNewAd);
	app.route('/accomodation/getLists').post(AccomodationController.getLists);
 }

