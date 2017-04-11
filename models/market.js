var mongoose = require('mongoose');

// Jumbo Schema
var schMarketing = mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	snippet: {
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
var Market = module.exports = mongoose.model('Market', schMarketing);

// CRUD functions
// Must be exported to be accessible to the rest of the app

/* Get all Market records with where clause
 * @param: pCallback = is a callback function
 * @param: pSort = is a where clause
 * @param: pLimit = is the number or collection items to be return 
 *		   limit without parameter returns all items in collection
 */
module.exports.getMarkets = function(pCallback, pSort, pLimit) {
	Market.find(pCallback).sort(pSort).limit(pLimit);
}

/* Get specific Market by unique id
 * @param: pId = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.getMarketById = function(pId, pCallback) {
	Market.findById(pId, pCallback);
}

/* Get Markets by filter
 * @param: pWhere = is a where clause
 * @param: pCallback = is a callback function
 */
module.exports.getMarketsByFilter = function(pCallback, pWhere, pLimit) {
	Market.find(pCallback).where(pWhere).limit(pLimit);
}

/* Get Markets by name
 * @param: pName = is the unique id of the item in the collection
 * @param: pCallback = is a callback function
 */
module.exports.getMarketsByName = function(pName, pCallback) {
	var query = {name: pName};
	
	Market.find(query, pCallback);
}

/* Add new Market item to collection
 * @param: pNewMarketObj = is a new Market object to be added to the collection
 * @param: pCallback = is a callback function
 */
module.exports.addMarket = function(pNewMarketObj, pCallback) {
	Market.create(pNewMarketObj, pCallback);		
}

/* Update existing Market item in collection
 * @param: pId = is the unique id of the item in the collection
 *  @param: pNewMarketObj = is an old Market item in collection that has id = pId
 */
module.exports.updateMarket = function(pId, pNewMarketObj, pOptions, pCallback) {
	var query = {_id: pId};

	var updateObj = {
		title: pNewMarketObj.title,
		snippet: pNewMarketObj.snippet,		
		imgUrl: pNewMarketObj.imgUrl,
		imgAlt: pNewMarketObj.imgAlt,
		status: pNewMarketObj.status,
		updatedDate: pNewMarketObj.updatedDate
	}

	Market.findOneAndUpdate(query, updateObj, pOptions, pCallback);	
}

/* Delete Market by id
 * @param: pId = is the Market id
 * @param: pCallback = is a callback function
 */
module.exports.removeMarket = function(pId, pCallback) {
	var query = {_id: pId};

	Market.remove(query, pCallback);	
}