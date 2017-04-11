var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var config = require('./config/config');

// Middleware
app.use(express.static(__dirname + '/app'))	// To serve up static files
app.use(bodyParser.json());					// To be able to post json objects


// Appends code in mongoose which connects to mongoose
require('./config/mongoose')(config);

// Appends code in routes
require('./routes/routes')(app);
require('./routes/rteAdmin')(app);
require('./routes/rteJumboTron')(app);
require('./routes/rteCarousel')(app);
require('./routes/rteSlide')(app);
require('./routes/rteMarket')(app);
require('./routes/rteNews')(app);

var port = 2345;
app.listen(port,function() {
	console.log('server listening on port ' + port);
});