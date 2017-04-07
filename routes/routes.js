var express = require('express');

// @param: app = is the variable in server.js
module.exports = function(app) {

	var rtrMain = express.Router();

	// Server function calls to the model
	rtrMain.route('/')
	.get(function(req,res) {
		res.send('use /api/* when making server calls');
	});
	
	app.use('/', rtrMain);
}