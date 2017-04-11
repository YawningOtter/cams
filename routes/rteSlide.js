var express = require('express');
// Collection objects - allows calls to functions in the model
var Slide = require('../models/slide');
var Carousel = require('../models/carousel');

// @param: app = is the variable in server.js
module.exports = function(app) {

	var rtrSlide = express.Router();

	rtrSlide.route('/slides')	
	.get(function(req, res) {			// Retrieve the Slide item from collection
		Slide.getSlides(function(err, resSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resSlide);
		},
		{name: "asc", order: "asc"});
	})
	.post(function(req, res) {			// Create a new Slide item in collection
		var newSlideObj = new Slide({
			name: req.body.name,
			caption: req.body.caption,
			imgUrl: req.body.imgUrl,
			imgAlt: req.body.imgAlt,			
			order: req.body.order,
			status: req.body.status
		});

		Slide.addSlide(newSlideObj,function(err, resNewSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNewSlide);
		});
	});

	rtrSlide.route('/slides/add')	
	.post(function(req, res) {			// Retrieve the Slide item from collection

		Slide.addSlideRef(function(err, resSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resSlide);
		},
		{name: "asc", order: "asc"});
	});

	// Returns the latest Slide record
	rtrSlide.route('/slides/filter/:name')
	.get(function(req, res) {			// Retrieve the Slide item from collection
		var pName = req.params.name;

		Slide.getSlideByFilter(function(err, resSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resSlide);
		},
		{status: 'ACTIVE', name: pName});	// where clause status is active
	});	

	rtrSlide.route('/slides/saveRef:_id')
	.get(function(req, res) {
		var id = req.params._id
		
		Carousel.getCarouselPopulateSlides(id, function(err, resCarousel) {			
			if(err) {
				res.send({error:err});
			}
			//console.log(res);
			res.json(resCarousel);
		});
	});

	rtrSlide.route('/slides/:_id')
	.get(function(req, res) {			// Retrieve the Slide item from collection by Id
		//return a specific document identified by id paramter
		var pId = req.params._id;

		//looks through collection and gets the specified obj by id
		Slide.getSlideById(pId,function(err, resSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resSlide);
		});


	})
	.post(function(req, res) {			// Create a new Slide item in collection
		var pId = req.params._id;

		Carousel.find()
		var newSlideObj = new Slide({
			name: req.body.name,
			caption: req.body.caption,
			imgUrl: req.body.imgUrl,
			imgAlt: req.body.imgAlt,			
			order: req.body.order,
			status: req.body.status
		});

		Slide.addSlide(newSlideObj,function(err, resNewSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNewSlide);
		});
	})
	/*.post(function(req, res) {			// Create a new Slide item in collection by Id
		var newSlideObj = new Slide({
			name:req.body.name,
			carousel:req.body.carousel,
			caption:req.body.caption,
			imgUrl:req.body.imgUrl,
			imgAlt:req.body.imgAlt,
			order:req.body.order,
			status:req.body.status
		});

		Slide.addSlide(newSlideObj,function(err, resNewSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNewSlide);
		});
	})*/
	.put(function(req, res) {			// Update a Slide item in collection by Id
		var id = req.params._id;
		var newSlideObj = new Slide({
			name:req.body.name,
			carousel:req.body.carousel,
			caption:req.body.caption,
			imgUrl:req.body.imgUrl,
			imgAlt:req.body.imgAlt,
			order:req.body.order,
			status:req.body.status,
			updatedDate:req.body.updatedDate
		});

		Slide.updateSlide(id, newSlideObj, {}, function(err, resSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resSlide);		// send the new updated obj back
		});
	})
	.delete(function(req, res) {
		var pNewId = req.params._id;
		console.log(pNewId);
		Slide.removeSlide(pNewId, function(err, resSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resSlide);
		});	
	});

	rtrSlide.route('/slides/:name')
	.get(function(req, res) {				// Retrieve the Slide by name from collection
		var pName = req.params.name;

		Slide.getSlidesByName(pName, function(err, resSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resSlide);
		});		// sort on created_at field for the latest record
	})
	.delete(function(req, res) {			// Delete Slides by name from collection
		var pName = req.params.name;

		Slide.removeSlidesByName(pName, function(err, resSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resSlide);
		});
	});


	app.use('/api', rtrSlide);
}