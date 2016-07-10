// All required utils for the app
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var config     = require('config');
var crypto     = require('crypto');
var https      = require('https');
var request    = require('request');

const HASH = config.get("hash");

const Firebase = require('./config/Firebase.js');
const db = Firebase.database();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var router = express.Router();

var path    = require("path");

app.set('port', port);
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// middleware to use for all requests
router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var path    = require("path");

app.use(express.static(path.join(__dirname, './')));

app.use("/styles",  express.static(__dirname + '/styles'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/images",  express.static(__dirname + '/images'));

app.get('/', function(req,res){
	res.sendfile(path.join(__dirname + '/index.html'));
});

function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an
    // error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', HASH)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

var api = require('./controllers/api-controller.js')
router.route('/listings/:id')
	.get(api.getListingById);
router.route('/listings/type/:type')
	.get(api.getListingByType);
router.route('/listings/nearby/:distance')
	.get(api.getListingsNearby);
router.route('/listings')
	.get(api.getListings)
	.post(api.postListing);
router.route('/listings/search/:keywords')
	.get(api.searchListings);

router.route('/reviews')
	.post(api.postReview);
router.route('/reviews/listing/:listing_id')
	.get(api.getReviewByListing)
router.route('/reviews/id/:review_id')
	.get(api.getReviewById)
	.put(api.updateReviewById);

app.use('/api/v1', router);

// START THE SERVER
// =============================================================================
var server = app.listen(port);
console.log('Server on: ' + port);

module.exports = server