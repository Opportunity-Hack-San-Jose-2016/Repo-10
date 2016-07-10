
const Firebase = require('../config/Firebase.js');
var math = require('mathjs');
const db = Firebase.database();


// API Endpoint - GET /api/v1/listings
exports.getListings = function(req, res){
	var listings = db.ref("listings");
	listings.once('value', function(snapshot){
		data = snapshot.val();
		res.status(200);
		res.json(data);
	});
};

// API Endpoint - POST /api/v1/listings
exports.postListing = function(req, res){
	
	var listing = {};
	listing.location = {}
	listing.location.lat = req.body.location.lat
	listing.location.lng = req.body.location.lng
	listing.name = req.body.name
	listing.type = req.body.type
	listing.reviews = {}
	
	var listings = db.ref("listings");
	var newKey = listings.push(listing).key
	req.params.id = newKey
	
	var href = req.protocol + "://" + req.get('host') + req.baseUrl + '/listings/' + newKey
	returnVal = {}
	returnVal.href = href;
	returnVal.itemId= newKey
	returnVal.item = listing
	res.status(201)
	res.json(returnVal)
};

// API Endpoint - GET /api/v1/listings/id/:id
exports.getListingById = function(req, res){
	l_id = req.params.id
	var listings = db.ref("listings/" + l_id);
	listings.once('value', function(snapshot){

		data = snapshot.val() //listings table
		if (data != undefined){
			res.status(200)
			res.json(data)
		} else {
			res.status(418)
			res.json({
				message:"I'm a teapot, short and stout. Your entity body tipped me over and poured me out.",
				real_message:"Seriously your ID parameter wasn't found. Pick a new one.",
				real_status: 404
			})
		}
	})
}

// API Endpoint - GET /api/v1/listings/type/:type
exports.getListingByType = function(req, res) {
	var listings = db.ref("listings")
	listings.orderByChild('type').equalTo(req.params.type).once('value', function(snapshot){
		var data = snapshot.val();
		if(data == null){
			data = []
		}
		res.status(200);
		res.json(data);
	});
}

// API Endpoint GET /api/v1/listings/nearby/:distance?lat=&lng=
exports.getListingsNearby = function(req, res) {
	var listings = db.ref("listings")
	lat = req.query.lat
	lng = req.query.lng
	if(lat == null || lng == null || req.params.distance == null) {
		res.status(400)
		res.json({message:"Missing latitude, longitude, or miles parameters"})
	} else {
		origin = {}
		origin.lat = lat
		origin.lng = lng
		listings.once('value', function(snapshot){
			data = snapshot.val();
			nearby_listings = []
			for (entry in data) {
				if (data[entry].location != null) {
					if (isWithinMiles(origin, data[entry].location, req.params.distance)) {
						nearby_listings.push(data[entry]);
					}	
				}
				
			}
			res.status(200);
			res.json(nearby_listings);
		});
	}
}

function isWithinMiles(origin, other, dist_miles) {

	num =  math.cos( toRads(origin.lat) ) * math.cos( toRads( other.lat ) ) * math.cos( toRads( other.lng ) - toRads(origin.lng) ) + math.sin( toRads(origin.lat) ) * math.sin( toRads( other.lat ) )
	distance = ( 3959 * math.acos( num ) )

//	if(distance <= dist_miles){
//		console.log(other.lat + ', ' + other.lng)
//	}
	return distance <= dist_miles
}

function toRads(num) {
	return (num * math.pi) / 180
}


var reviews = db.ref("reviews");

// API Endpoint - POST /api/v1/reviews
exports.postReview = function(req, res){
	var review = {};
	review.review_text = req.body.review_text;
	review.rating = req.body.rating;
	review.listing_id = req.body.listing_id;
	var listref = db.ref("listings/" + review.listing_id + "/reviews");
	reviews.once("value", function(snapshot) {
		var index = snapshot.val().length;
		listref.push(reviews.push(review).key);
		res.status(200);
		res.send();
	})
}

// API Endpoint - GET /api/v1/reviews/listing/:listing_id
exports.getReviewByListing = function(req, res){
	var listing_id = req.params.listing_id;
	var listing = db.ref('listings')
	listing.once("value", function (snapshot){
		var data = snapshot.val();
		if (listing_id > data.length || listing_id < 0) {
			res.status(418);
			res.json({"message": "invalid"});
		}


		var listrevs = data[listing_id].reviews;
		reviews.once("value", function(rsnapshot) {
			var revData = rsnapshot.val();
			var result = [];
			for (var key in listrevs) {
				if (listrevs.hasOwnProperty(key)) {
					var item = revData[listrevs[key]];
					item["id"] = key;
					result.push(item);
				}
			}
			res.status(200);
			res.json(result);
		});

	})
}
	
// API Endpoint - GET /api/v1/reviews/id/:id
exports.getReviewById = function(req, res){
	var review_id = req.params.review_id;
	reviews.once("value", function (snapshot) {
		var result = snapshot.val()[review_id];
		res.status(200);
		res.json(result);
	})
}
	

// API Endpoint - PUT /api/v1/reviews/id/:id
exports.updateReviewById = function(req, res){
	var review_id = req.params.review_id;
	var review = db.ref("reviews/" + review_id);
	review.set({
		review_text: req.params.review_text,
		listing_id: req.params.listing_id,
		rating: req.params.rating
	});
	res.status(200);

}

// API Endpoint GET /api/v1/listings/nearby/:distance

//( 3959 * acos( cos( radians(37) ) * cos( radians( INPUT_LATITUDE ) ) * cos( radians( INPUT_LONGITUDE ) - radians(MY_LONGITUDE) ) + sin(radians(MY_LATITUDE) ) * sin( radians(INPUT_LATITUDE) )))
	
	
	
	
	
	
	
	
	
	
	
	