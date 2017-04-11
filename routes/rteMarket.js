var express = require('express');
// Collection objects - allows calls to functions in the model
var Market = require('../models/market');

// @param: app = is the variable in server.js
module.exports = function(app) {

	var rtrMarket = express.Router();

	rtrMarket.route('/markets')	
	.get(function(req, res) {			// Retrieve the Market item from collection
		Market.getMarkets(function(err, resMarket) {
			if(err) {
				res.send({error:err});
			}
			res.json(resMarket);
		},
		{name: "asc", order: "asc"});
	})
	.post(function(req, res) {			// Create a new Market item in collection
		var newMarketObj = new Market({
			title: req.body.title,
			snippet: req.body.snippet,
			imgUrl: req.body.imgUrl,
			imgAlt: req.body.imgAlt,
			status: req.body.status
		});

		Market.addMarket(newMarketObj,function(err, resNewMarket) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNewMarket);
		});
	});

	// Returns the latest Jumbo Tron record
	rtrMarket.route('/markets/filter')
	.get(function(req, res) {			// Retrieve the Jumbo Tron item from collection
		Market.getMarketsByFilter(function(err, resMarkets) {
			if(err) {
				res.send({error:err});
			}
			res.json(resMarkets);
		},
		{status: 'ACTIVE'}, 3);		// sort on created_at field for the latest record
	});

	rtrMarket.route('/markets/:_id')
	.get(function(req, res) {			// Retrieve the Market item from collection by Id
		//return a specific document identified by id paramter
		var pId = req.params._id;

		//looks through collection and gets the specified obj by id
		Market.getMarketById(pId,function(err, resMarket) {
			if(err) {
				res.send({error:err});
			}
			res.json(resMarket);
		});
	})
	.post(function(req, res) {			// Create a new Market item in collection by Id
		var newMarketObj = new Market({
			title:req.body.title,			
			snippet:req.body.snippet,
			imgUrl:req.body.imgUrl,
			imgAlt:req.body.imgAlt,
			status:req.body.status
		});

		Market.addMarket(newMarketObj,function(err, resNewMarket) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNewMarket);
		});
	})
	.put(function(req, res) {			// Update a Market item in collection by Id
		var id = req.params._id;
		var newMarketObj = new Market({
			title:req.body.title,
			snippet:req.body.snippet,
			imgUrl:req.body.imgUrl,
			imgAlt:req.body.imgAlt,
			status:req.body.status,
			updatedDate:req.body.updatedDate
		});

		Market.updateMarket(id, newMarketObj, {}, function(err, resMarket) {
			if(err) {
				res.send({error:err});
			}
			res.json(resMarket);		// send the new updated obj back
		});
	})
	.delete(function(req, res) {
		var pNewId = req.params._id;

		Market.removeMarket(pNewId, function(err, resMarket) {
			if(err) {
				res.send({error:err});
			}
			res.json(resMarket);
		});	
	});

	app.use('/api', rtrMarket);
}