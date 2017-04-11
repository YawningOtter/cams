var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;

// Jumbo Schema
var schCarousel = mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	slide : [{ 
		type : mongoose.Schema.Types.ObjectId, 
		ref: 'Slide'
	}],
	status: {
		type: String,
		require: true
	},
	updatedDate: {
		type: Date,
		require: false
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});

// allows to be accessible from anywhere
var Carousel = module.exports = mongoose.model('Carousel', schCarousel);

// CRUD functions
// Must be exported to be accessible to the rest of the app

/*
 * Get all carousels
 * @param: pCallback = is a callback function
 * @param: pLimit = is the number or collection items to be return 
 *		   limit without parameter returns all items in collection
 */
module.exports.getCarousels = function(pCallback, pLimit) {
	Carousel.find(pCallback).limit(pLimit);
}

/* Save Ref
 * @param: pCallback = is a callback function
 */
/*module.exports.saveSlideRef = function(pCallback) {
	Carousel.save(pCallback);
}*/

/* Get specific carousel by unique id
 * @param: pId = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.getCarouselById = function(pId, pCallback) {
	Carousel.findById(pId, pCallback);
}

/* Get specific carousel using where clause
 * @param: pId = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.getCarouselsByFilter = function(pCallback, pWhere) {
	Carousel.find(pCallback).where(pWhere)
     .populate('slide').exec(function(err, slides) {
     	//console.log(slides);
     });
	//Carousel.find(pCallback).where(pWhere);
}

/* Populate carousel with slides
 * @param: pCallback = is a callback function
 */
module.exports.getCarouselPopulateSlides = function(pCallback) {
	Carousel.find(pCallback)
     .populate('slide').exec(function(err, slides) {
     	//console.log(slides);
     });
}

/* Add new carousel item to collection
 * @param: pNewCarouselObj = is a new jumbo tron object to be added to the collection
 * @param: pCallback = is a callback function
 */
module.exports.addCarousel = function(pNewCarouselObj, pCallback) {
	Carousel.create(pNewCarouselObj, pCallback);
}

/* Update existing carousel item in collection
 * @param: pId = is the unique id of the item in the collection
 * @param: pNewCarouselObj = is an old jumbo tron item in collection that has id = pId
 */
module.exports.updateCarousel = function(pId, pNewCarouselObj, pOptions, pCallback) {
	var query = {_id: pId};

	var updateObj = {
		name: pNewCarouselObj.name,
		slide: pNewCarouselObj.slide,
		status: pNewCarouselObj.status,
		updatedDate: pNewCarouselObj.updatedDate
	}

	Carousel.findOneAndUpdate(query, updateObj, pOptions, pCallback);
}

/* Update existing carousel item in collection
 * @param: pId = is the unique id of the item in the collection
 * @param: pNewCarouselObj = is an old jumbo tron item in collection that has id = pId
 */
module.exports.addSlideRef = function(pId, pCallback) {
	var query = {_id: pId};
	
	Carousel.findOne(query, pCallback);
	//Carousel.findOneAndUpdate(query, updateObj, pOptions, pCallback);
}

/* Delete carousel function
 * @param: pId = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.removeCarousel = function(pId, pCallback) {
	var query = {_id: pId};

	Carousel.remove(query, pCallback);	
}