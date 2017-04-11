var mongoose = require('mongoose');

// Jumbo Schema
var schNewsing = mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	snippet: {
		type: String,
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
var News = module.exports = mongoose.model('News', schNewsing);

// CRUD functions
// Must be exported to be accessible to the rest of the app

/* Get all News records with where clause
 * @param: pCallback = is a callback function
 * @param: pSort = is a where clause
 * @param: pLimit = is the number or collection items to be return 
 *		   limit without parameter returns all items in collection
 */
module.exports.getNews = function(pCallback, pSort, pLimit) {
	News.find(pCallback).sort(pSort).limit(pLimit);
}

/* Get specific News by unique id
 * @param: pId = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.getNewsById = function(pId, pCallback) {
	News.findById(pId, pCallback);
}

/* Get News by filter
 * @param: pWhere = is a where clause
 * @param: pCallback = is a callback function
 */
module.exports.getNewsByFilter = function(pCallback, pWhere, pLimit) {
	News.find(pCallback).where(pWhere).limit(pLimit);
}

/* Get News by name
 * @param: pName = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.getNewsByName = function(pName, pCallback) {
	var query = {name: pName};
	
	News.find(query, pCallback);
}

/* Add new News item to collection
 * @param: pNewNewsObj = is a new News object to be added to the collection
 * @param: pCallback = is a callback function
 */
module.exports.addNews = function(pNewNewsObj, pCallback) {
	News.create(pNewNewsObj, pCallback);		
}

/* Update existing News item in collection
 * @param: pId = is the unique id of the item in the collection
 *  @param: pNewNewsObj = is an old News item in collection that has id = pId
 */
module.exports.updateNews = function(pId, pNewNewsObj, pOptions, pCallback) {
	var query = {_id: pId};

	var updateObj = {
		title: pNewNewsObj.title,
		snippet: pNewNewsObj.snippet,
		status: pNewNewsObj.status,
		updatedDate: pNewNewsObj.updatedDate
	}

	News.findOneAndUpdate(query, updateObj, pOptions, pCallback);	
}

/* Delete News by id
 * @param: pId = is the News id
 * @param: pCallback = is a callback function
 */
module.exports.removeNews = function(pId, pCallback) {
	var query = {_id: pId};

	News.remove(query, pCallback);	
}