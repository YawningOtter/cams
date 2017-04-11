var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;

// Jumbo Schema
var schSlide = mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	carousel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Carousel'
	},
	caption: {
		type: String,
		require: true
	},
	imgUrl: {
		type: String,
		require: true
	},
	imgAlt: {
		type: String,
		require: true
	},
	order: {
		type: Number,
		require: true
	},	
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
var Slide = module.exports = mongoose.model('Slide', schSlide);

// CRUD functions
// Must be exported to be accessible to the rest of the app

/* Get all slide records with where clause
 * @param: pCallback = is a callback function
 * @param: pSort = is a where clause
 * @param: pLimit = is the number or collection items to be return 
 *		   limit without parameter returns all items in collection
 */
module.exports.getSlides = function(pCallback, pSort, pLimit) {
	Slide.find(pCallback).sort(pSort).limit(pLimit);
}

/* Save Ref
 * @param: pCallback = is a callback function
 */
module.exports.saveRef = function(pCallback) {
	Slide.save(pCallback);
}

/* Get specific slide by unique id
 * @param: pId = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.getSlideById = function(pId, pCallback) {
	Slide.findById(pId, pCallback);
}

/* Get specific slide by unique id
 * @param: pId = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.getSlidesPopulateCarousel = function(pCallback) {
	Slide.findOne(pCallback)
	.populate('carousel').exec(function(err, slides) {
     	console.log(slides);
     });
}

/* Get slides by name
 * @param: pName = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.getSlidesByName = function(pName, pCallback) {
	var query = {name: pName};
	
	Slide.find(query, pCallback);
}

/* Add new slide item to collection
 * @param: pNewSlideObj = is a new slide object to be added to the collection
 * @param: pCallback = is a callback function
 */
module.exports.addSlide = function(pNewSlideObj, pCallback) {
	Slide.create(pNewSlideObj, pCallback);		
}


/* Add new slide item to collection
 * @param: pNewSlideObj = is a new slide object to be added to the collection
 * @param: pCallback = is a callback function
 */
module.exports.addSlideRef = function(pNewSlideObj, pCallback) {
	Slide.create(pNewSlideObj, pCallback);		
}

/* Update existing slide item in collection
 * @param: pId = is the unique id of the item in the collection
 *  @param: pNewSlideObj = is an old slide item in collection that has id = pId
 */
module.exports.updateSlide = function(pId, pNewSlideObj, pOptions, pCallback) {
	var query = {_id: pId};

	var updateObj = {
		name: pNewSlideObj.name,
		carousel: pNewSlideObj.carousel,
		caption: pNewSlideObj.caption,		
		imgUrl: pNewSlideObj.imgUrl,
		imgAlt: pNewSlideObj.imgAlt,
		order: pNewSlideObj.order,
		status: pNewSlideObj.status,
		updatedDate: pNewSlideObj.updatedDate
	}

	Slide.findOneAndUpdate(query, updateObj, pOptions, pCallback);	
}

/* Delete slide by id
 * @param: pId = is the slide id
 * @param: pCallback = is a callback function
 */
module.exports.removeSlide = function(pId, pCallback) {
	var query = {_id: pId};

	Slide.remove(query, pCallback);	
}