var mongoose = require('mongoose');

// Jumbo Schema
var schJumboTron = mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	snippet: {
		type: String,
		require: true
	},
	ctaUrlName: {
		type: String,
		require: true
	},
	ctaUrl: {
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
var JumboTron = module.exports = mongoose.model('JumboTron', schJumboTron);

// CRUD functions
// Must be exported to be accessible to the rest of the app

/* Gets all Jumbo Tron records
 * @param: pCallback = is a callback function
 * @param: pLimit = is the number or collection items to be return 
		   limit without parameter returns all items in collection
		   */
module.exports.getJumboTrons = function(pCallback, pLimit) {
	JumboTron.find(pCallback).limit(pLimit);
}

/* Gets all Jumbo Tron records using where clause
 * @param: pCallback = is a callback function
 * @param: pWhere = is a json object containing a filter clause
 * @param: pLimit = is the number or collection items to be return 
		   limit without parameter returns all items in collection
 */
module.exports.getJumboTronsByFilter = function(pCallback, pWhere, pLimit) {
	JumboTron.find(pCallback).where(pWhere).limit(pLimit);
}

/* Get the lastest Jumbo Tron record
 * @param: pCallback = is a callback function
 * @param: pSort = is how the query will return, it can be ascending or decending
 * @param: pLimit = is the number or collection items to be return 
 		   limit without parameter returns all items in collection
 */
module.exports.getLastestJumboTron = function(pCallback, pSort, pLimit) {
	JumboTron.find(pCallback).sort(pSort).limit(pLimit);
}

/* Get specific jumbo tron by unique id
 * @param: pId = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.getJumboTronById = function(pId, pCallback) {
	JumboTron.findById(pId, pCallback);
}

/* Add new jumbo tron item to collection
 * @param: pNewJumboTron = is a new jumbo tron object to be added to the collection
 * @param: pCallback = is a callback function
 */
module.exports.addJumboTron = function(pNewJumboTronObj, pCallback) {
	JumboTron.create(pNewJumboTronObj, pCallback);		
}


/* Update existing jumbo tron item in collection
 * @param: pId = is the unique id of the item in the collection
 *  @param: pNewJumboTronObj = is an old jumbo tron item in collection that has id = pId
 */
module.exports.updateJumboTron = function(pId, pNewJumboTronObj, pOptions, pCallback) {
	var query = {_id: pId};

	var updateObj = {
		title: pNewJumboTronObj.title,
		snippet: pNewJumboTronObj.snippet,
		ctaUrlName: pNewJumboTronObj.ctaUrlName,
		ctaUrl: pNewJumboTronObj.ctaUrl,
		imgUrl: pNewJumboTronObj.imgUrl,
		imgAlt: pNewJumboTronObj.imgAlt,
		status: pNewJumboTronObj.status,
		updatedDate: pNewJumboTronObj.updatedDate
	}

	JumboTron.findOneAndUpdate(query, updateObj, pOptions, pCallback);	
}

/* Delete jumbo tron function
 * @param: pId = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.removeJumboTron = function(pId, pCallback) {
	var query = {_id: pId};

	JumboTron.remove(query, pCallback);	
}