// All required utils for the app
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var config = require('config');
var crypto = require('crypto');
var  https = require('https');
var request = require('request');

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

app.get('/',function(req,res){
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




router.route('/listings/:id')
	.get(function(req, res){
		var listings = db.ref("listings");
		l_id = req.params.id
		listings.once('value', function(snapshot){
    		
			data = snapshot.val() //listings table
			
			if (l_id >= 0 && l_id < data.length){
				listing_data = data[id]
				res.json(listing_data)
				res.status(200)
			} else {
				res.status(418)
				res.json({
					message:"I'm a teapot, short and stout. Your entity body tipped me over and poured me out.",
					real_message:"Seriously your ID parameter was invalid. Pick a new one."
				})
			}
			res.send()
		});
	});

router.route('/listings')
	.get(function(req, res){
		var listings = db.ref("listings");
		listings.once('value', function(snapshot){
			data = snapshot.val();
			res.json(data);
			res.status(200);
			res.send();
		});
	});

var reviews = db.ref("reviews");


router.route('/reviews')
	.post(function(req, res){
		var review = {};
		review.review_text = req.params.review_text;
		review.rating = req.params.rating;
		review.listing_id = req.params.listing_id;
		var listref = db.ref("listings/" + listing_id + "/reviews");
		reviews.once("value", function(snapshot) {
			var index = snapshot.val().length;
			listref.push(index);
			reviews.push(review);
			res.status(200);
			res.send();
		});
	});

router.route('/reviews/listing/:listing_id')
	.get(function(req, res){
		var listing_id = req.params.listing_id;
		listing.once("value", function (snapshot){
			var data = snapshot.value();
			if (listing_id > data.length || listing_id < 0) {
		    	res.status(418);
		    	res.json({"message": "invalid"});
		    	res.send();
	    	}


	    	var listrevs = data[listing_id].reviews;
	    	reviews.once("value", function(rsnapshot) {
	    		var revData = rsnapshot.value();
			    var result = [];
			    for (var i = 0; i < listrevs.length; i++) {
		    		result.push(revData[listrevs[i]]);
			    }
			    res.status(200);
			    res.json(result);
			    res.send();
	    	});

		});
	})

router.route('/reviews/id/:review_id')
	.get(function(req, res){
		var review_id = req.params.review_id;
		reviews.once("value", function (snapshot) {
			var result = snapshot.val()[review_id];
		    console.log(result);
			res.status(200);
			res.json(result);
			res.send();
		});
	})
	.put(function(req, res){
		var review_id = req.params.review_id;
		var review = db.ref("reviews/" + review_id);
		review.set({
			review_text: req.params.review_text,
			listing_id: req.params.listing_id,
			rating: req.params.rating
		});
		res.status(200);
		res.send();
	
	});


app.use('/api/v1', router);


// START THE SERVER
// =============================================================================
var server = app.listen(port);
console.log('Server on: ' + port);

module.exports = server
