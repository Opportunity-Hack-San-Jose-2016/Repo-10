// All required utils for the app 
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var router = express.Router();


var path    = require("path");

app.use(express.static(path.join(__dirname, './')));


// middleware to use for all requests
router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log('API Being Accessed');
	next();
});

var path    = require("path");

app.use(express.static(path.join(__dirname, './')));

app.use("/styles",  express.static(__dirname + '/styles'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/images",  express.static(__dirname + '/images'));

app.get('/',function(req,res){
	res.sendfile(path.join(__dirname + '/index.html'));
});

app.use('/api', router);





// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server on: ' + port);