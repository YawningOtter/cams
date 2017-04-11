var express = require('express');
// Collection objects - allows calls to functions in the model
var Carousel = require('../models/carousel');
var Slide = require('../models/slide');

// @param: app = is the variable in server.js
module.exports = function(app) {

	var rtrCarousel = express.Router();

	rtrCarousel.route('/carousels/')
	.get(function(req, res) {			// Retrieve the Carousel item from collection
		/*Carousel.getCarousels(function(err, resCarousel) {
			if(err) {
				res.send({error:err});
			}
			res.json(resCarousel);
		});	*/

		Carousel.getCarouselPopulateSlides(function(err, resCarousel) {			
			if(err) {
				res.send({error:err});
			}
			res.json(resCarousel);
		});
	})
	.post(function(req, res) {			// Create a new Carousel item in collection by Id
		
		var newCarouselObj = new Carousel({
			name:req.body.name,
			slide:req.body.slide,
			status:req.body.status
		});

		var newSlideObj = new Slide({
			carousel : newCarouselObj._id}
		);

		newSlideObj.save(function(err) {
			if(err) {
				res.send({error:err});
			}
		});

		newCarouselObj.slide.push(newSlideObj);

		Carousel.addCarousel(newCarouselObj, function(err, resNewSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNewSlide);
		});
	});

	rtrCarousel.route('/carousels/saveRef/:_id')
	.put(function(req, res) {			// Create a new Slide item in existing carousel collection

		var pId = req.params._id;

		// Finds the carousel by if and adds a new slide to it
		Carousel.findOne({_id:pId}, function(err, caro) {
			var newSlideObj = new Slide({
				name: req.body.name,
				carousel: pId,
				caption: req.body.caption,		
				imgUrl: req.body.imgUrl,
				imgAlt: req.body.imgAlt,
				order: req.body.order,
				status: req.body.status
			});

			// saves to collection
			newSlideObj.save(function(err, pSlide) {
				if(err) {
					res.send({error:err});
				}

				caro.slide.push(pSlide._id);
				caro.save();
				res.send(caro.slide);

			});			
		});

		/*Carousel.addSlideRef(pId,function(err, resCarousel) {
			if(err) {
				res.send({error:err});
			}

			res.json(resCarousel);
		});*/
	});

	// Returns the latest Jumbo Tron record
	rtrCarousel.route('/carousels/filter')
	.get(function(req, res) {			// Retrieve the Jumbo Tron item from collection
		Carousel.getCarouselsByFilter(function(err, resCarousel) {
			if(err) {
				res.send({error:err});
			}
			res.json(resCarousel);
		},
		{status: 'ACTIVE'});		// where clause on status
	});

	// Returns the latest Carousel record
	rtrCarousel.route('/carousels/:_id')
	.get(function(req, res) {			// Retrieve the Jumbo Tron item from collection by Id
		var pId = req.params._id;

		Carousel.getCarouselById(pId,function(err, resCarousel) {
			if(err) {
				res.send({error:err});
			}
			res.json(resCarousel);
		});
	})
	.post(function(req, res) {			// Create a new Carousel item in collection by Id
		var newCarouselObj = new Carousel({
			name:req.body.name,
			slide:req.body.slide,
			status:req.body.status
		});

		Carousel.addCarousel(newCarouselObj,function(err, resNewSlide) {
			if(err) {
				res.send({error:err});
			}
			res.json(resNewSlide);
		});
	})
	.put(function(req, res) {			// Update a Carousel item in collection by Id
		var pId = req.params._id;
		var newCarouselObj = new Carousel({
			name:req.body.name,
			slide: req.body.slide,
			status:req.body.status,			
			updatedDate:req.body.updatedDate
		});

		Carousel.updateCarousel(pId, newCarouselObj, {}, function(err, resCarousel) {
			if(err) {
				res.send({error:err});
			}
			res.json(resCarousel);		// send the new updated obj back
		});
	})
	.delete(function(req, res) {			// Retrieve the Carousel item from collection
		var pId = req.params._id;

		Carousel.removeCarousel(pId, function(err, resCarousel) {
			if(err) {
				res.send({error:err});
			}
			res.json(resCarousel);
		});
	});

	app.use('/api', rtrCarousel);
}