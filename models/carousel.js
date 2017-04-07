var mongoose = require('mongoose');

// Jumbo Schema
var schCarousel = mongoose.Schema({	
	imgUrl: {
		type: String,
		require: true
	},
	imgAlt: {
		type: String,
		require: true
	},
	carouselCaption: {
		type: String,
		require: true
	},
	order: {
		type: Number,
		require: true
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

// allows to be accessible from anywhere
var Carousel = module.exports = mongoose.model('Carousel', schCarousel);

// CRUD functions
// Must be exported to be accessible to the rest of the app
// @param: pCallback = is a callback function
// @param: pLimit = is the number or collection items to be return 
// 		   limit without parameter returns all items in collection
module.exports.getCarousel = function(pCallback, pLimit) {
	Carousel.find(pCallback).limit(pLimit);		
}

// Get specific jumbo tron by unique id
// @param: pId = is the unique id of the item in the collection
// @param: pCallback = is a callback function
module.exports.getCarouselById = function(pId, pCallback) {
	Carousel.findById(pId, pCallback);
}

// Add new jumbo tron item to collection
// @param: pNewJumboTron = is a new jumbo tron object to be added to the collection
// @param: pCallback = is a callback function
module.exports.addCarousel = function(pNewCarouselObj, pCallback) {
	Carousel.create(pNewCarouselObj, pCallback);		
}


// Update existing jumbo tron item in collection
// @param: pId = is the unique id of the item in the collection
// @param: pNewJumboTronObj = is an old jumbo tron item in collection that has id = pId
module.exports.updateCarousel = function(pId, pNewCarouselObj, pOptions, pCallback) {
	var query = {_id: pId};

	var updateObj = {
		imgUrl: pNewCarouselObj.imgUrl,
		imgAlt: pNewCarouselObj.imgAlt,
		carouselCaption: pNewCarouselObj.carouselCaption,
		order: pNewCarouselObj.order
	}

	Carousel.findOneAndUpdate(query, updateObj, pOptions, pCallback);	
}

// Delete Book function
// @param: pId = is the unique id of the item in the collection
// @param: pCallback = is a callback function
module.exports.deleteCarousel = function(pId, pCallback) {
	var query = {_id: pId};

	Carousel.remove(query, pCallback);	
}