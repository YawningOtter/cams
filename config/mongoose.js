var mongoose = require('mongoose');


// @param: config = is from the config variable required in server.js
module.exports = function(config) {
	mongoose.Promise = global.Promise;
	
	mongoose.connect(config.db);	
	
	var db = mongoose.connection;
	db.on('error',console.error.bind(console,'connection error:'));
	db.once('open', function() { console.log('Connected to db')});	
}