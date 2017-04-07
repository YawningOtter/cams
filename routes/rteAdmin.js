var express = require('express');

// @param: app = is the variable in server.js
module.exports = function(app) {

	var rtrAdmin = express.Router();

	// Server function calls to the model
	rtrAdmin.route('/')
	.get(function(req,res) {
		console.log("admin route test");
	});
	
	app.use('/admin', rtrAdmin);
}