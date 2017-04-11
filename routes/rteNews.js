var express = require('express');
// Collection objects - allows calls to functions in the model
var News = require('../models/news');

// @param: app = is the variable in server.js
module.exports = function(app) {

	var rtrNews = express.Router();

	rtrNews.route('/news')	
	.get(function(req, res) {			// Retrieve the News item from collection
		News.getNews(function(err, resNews) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNews);
		},
		{created_at: -1});
	})
	.post(function(req, res) {			// Create a new News item in collection
		var newNewsObj = new News({
			title: req.body.title,
			snippet: req.body.snippet,
			status: req.body.status
		});

		News.addNews(newNewsObj,function(err, resNews) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNews);
		});
	});


	// Returns the latest Jumbo Tron record
	rtrNews.route('/news/filter')
	.get(function(req, res) {			// Retrieve the Jumbo Tron item from collection
		News.getNewsByFilter(function(err, resNews) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNews);
		},
		{status: 'ACTIVE'});		// sort on created_at field for the latest record
	});

	rtrNews.route('/news/:_id')
	.get(function(req, res) {			// Retrieve the News item from collection by Id
		//return a specific document identified by id paramter
		var pId = req.params._id;

		//looks through collection and gets the specified obj by id
		News.getNewsById(pId,function(err, resNews) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNews);
		});
	})
	.post(function(req, res) {			// Create a new News item in collection by Id
		var newNewsObj = new News({
			title:req.body.title,
			snippet:req.body.snippet,	
			status:req.body.status
		});

		News.addNews(newNewsObj,function(err, resNews) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNews);
		});
	})
	.put(function(req, res) {			// Update a News item in collection by Id
		var id = req.params._id;
		
		var newNewsObj = new News({
			title:req.body.title,
			snippet:req.body.snippet,
			status:req.body.status,
			updatedDate:req.body.updatedDate
		});

		News.updateNews(id, newNewsObj, {}, function(err, resNews) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNews);		// send the new updated obj back
		});
	})
	.delete(function(req, res) {
		var pNewId = req.params._id;

		News.removeNews(pNewId, function(err, resNews) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNews);
		});	
	});

	app.use('/api', rtrNews);
}