var express = require('express');
// Collection objects - allows calls to functions in the model
var JumboTron = require('../models/jumboTron');


// @param: app = is the variable in server.js
module.exports = function(app) {
	
	var rtrJumboTron = express.Router();

	rtrJumboTron.route('/')	
	.get(function(req, res) {			// Retrieve the Jumbo Tron item from collection
		JumboTron.getJumboTron(function(err, pJumboTron) {
			if(err) {
				res.send({error:err});
			}
			res.json(pJumboTron);
		});	
	})
	.post(function(req, res) {			// Create a new Jumbo Tron item in collection
		var newJTObj = new JumboTron({
			title:req.body.title,
			snippet:req.body.snippet,
			ctaUrlName:req.body.ctaUrlName,
			ctaUrl:req.body.ctaUrl,
			imgUrl:req.body.imgUrl,
			imgAlt:req.body.imgAlt
		});

		JumboTron.addJumboTron(newJTObj,function(err, pNewJT) {
			if(err) {
				res.send({error:err});
			}
			res.json(pNewJT);
		});	
	});


	rtrJumboTron.route('/:id')
	.delete(function(req, res) {
		var newId = req.params._id;

		JumboTron.deleteJumboTron(newId, function(err, pJumboTron) {
			if(err) {
				res.send({error:err});
			}
			res.json(pJumboTron);
		});	
	})
	.get(function(req, res) {			// Retrieve the Jumbo Tron item from collection by Id
		//return a specific document identified by id paramter
		var id = req.params.id;

		//looks through collection and gets the specified obj by id
		JumboTron.getJumboTronById(id,function(err, pJumboTron) {
			if(err) {
				res.send({error:err});
			}
			res.json(pJumboTron);
		});
	})
	.post(function(req, res) {			// Create a new Jumbo Tron item in collection by Id
		var newJTObj = new JumboTron({
			title:req.body.title,
			snippet:req.body.snippet,
			ctaUrlName:req.body.ctaUrlName,
			ctaUrl:req.body.ctaUrl,
			imgUrl:req.body.imgUrl,
			imgAlt:req.body.imgAlt
		});

		JumboTron.addJumboTron(newJTObj,function(err, pNewJT) {
			if(err) {
				res.send({error:err});
			}
			res.json(pNewJT);
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
			imgAlt:req.body.imgAlt
		});

		JumboTron.updateJumboTron(id, newJumboTronObj, {}, function(err, pJumboTron) {
			if(err) {
				res.send({error:err});
			}
			res.json(pJumboTron);		// send the new updated obj back
		});
	});

	app.use('/api/jumbotron', rtrJumboTron);
}