var express = require('express');
// Collection objects - allows calls to functions in the model
var JumboTron = require('../models/jumboTron');


// @param: app = is the variable in server.js
module.exports = function(app) {
	
	var rtrJumboTron = express.Router();

	// Returns all the Jumbo Tron records
	rtrJumboTron.route('/jumbotrons')	
	.get(function(req, res) {			// Retrieve the Jumbo Tron item from collection
		JumboTron.getJumboTrons(function(err, resJumboTron) {
			if(err) {
				res.send({error:err});
			}
			res.json(resJumboTron);
		});
	})
	.post(function(req, res) {			// Create a new Jumbo Tron item in collection
		var newJTObj = new JumboTron({
			title:req.body.title,
			snippet:req.body.snippet,
			ctaUrlName:req.body.ctaUrlName,
			ctaUrl:req.body.ctaUrl,
			imgUrl:req.body.imgUrl,
			imgAlt:req.body.imgAlt,
			status:req.body.status
		});

		JumboTron.addJumboTron(newJTObj,function(err, resNewJT) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNewJT);
		});	
	});

	// Returns the latest Jumbo Tron record
	rtrJumboTron.route('/jumbotrons/filter')
	.get(function(req, res) {			// Retrieve the Jumbo Tron item from collection
		JumboTron.getJumboTronsByFilter(function(err, resJumboTron) {
			if(err) {
				res.send({error:err});
			}
			res.json(resJumboTron);
		},
		{status: 'ACTIVE'});		// sort on created_at field for the latest record
	});

	// Returns the latest Jumbo Tron record
	rtrJumboTron.route('/jumbotrons/latest')
	.get(function(req, res) {			// Retrieve the Jumbo Tron item from collection
		JumboTron.getLastestJumboTron(function(err, resJumboTron) {
			if(err) {
				res.send({error:err});
			}
			res.json(resJumboTron);
		},
		{'created_at': -1},		// sort on created_at field for the latest record
		1);		// limit or records
	});

	rtrJumboTron.route('/jumbotrons/:_id')	
	.get(function(req, res) {			// Retrieve the Jumbo Tron item from collection by Id
		//return a specific document identified by id paramter
		var id = req.params._id;

		//looks through collection and gets the specified obj by id
		JumboTron.getJumboTronById(id,function(err, resJumboTron) {
			if(err) {
				res.send({error:err});
			}
			res.json(resJumboTron);
		});
	})
	.post(function(req, res) {			// Create a new Jumbo Tron item in collection by Id
		var newJTObj = new JumboTron({
			title:req.body.title,
			snippet:req.body.snippet,
			ctaUrlName:req.body.ctaUrlName,
			ctaUrl:req.body.ctaUrl,
			imgUrl:req.body.imgUrl,
			imgAlt:req.body.imgAlt,
			status:req.body.status,
		});

		JumboTron.addJumboTron(newJTObj,function(err, resNewJT) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNewJT);
		});
	})
	.put(function(req, res) {			// Update a Jumbo Tron item in collection by Id
		var id = req.params._id;
		var newJumboTronObj = new JumboTron({
			title:req.body.title,
			snippet:req.body.snippet,
			ctaUrlName:req.body.ctaUrlName,
			ctaUrl:req.body.ctaUrl,
			imgUrl:req.body.imgUrl,
			imgAlt:req.body.imgAlt,
			status:req.body.status,
			updatedDate:req.body.updatedDate
		});

		JumboTron.updateJumboTron(id, newJumboTronObj, {}, function(err, resJumboTron) {
			if(err) {
				res.send({error:err});
			}
			res.json(resJumboTron);		// send the new updated obj back
		});
	})
	.delete(function(req, res) {
		var newId = req.params._id;

		JumboTron.removeJumboTron(newId, function(err, resJumboTron) {
			if(err) {
				res.send({error:err});
			}
			res.json(resJumboTron);
		});	
	});

	app.use('/api', rtrJumboTron);
}