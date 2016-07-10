
const Firebase = require('../config/Firebase.js');
const db = Firebase.database();

exports.getListings = function(req, res){
	var listings = db.ref("listings");
	listings.once('value', function(snapshot){
		data = snapshot.val();
		res.json(data);
		res.status(200);
		res.send();
	});
};

exports.getListingById = function(req, res){
	l_id = req.params.id
	var listings = db.ref("listings/" + l_id);
	listings.once('value', function(snapshot){

		data = snapshot.val() //listings table
		if (data != undefined){
			res.json(data)
			res.status(200)
		} else {
			res.status(418)
			res.json({
				message:"I'm a teapot, short and stout. Your entity body tipped me over and poured me out.",
				real_message:"Seriously your ID parameter wasn't found. Pick a new one.",
				real_status: 404
			})
		}
		res.send()
	})
}


var reviews = db.ref("reviews");

exports.postReview = function(req, res){
	var review = {};
	review.review_text = req.body.review_text;
	review.rating = req.body.rating;
	review.listing_id = req.body.listing_id;
	console.log(review)
	var listref = db.ref("listings/" + review.listing_id + "/reviews");
	reviews.once("value", function(snapshot) {
		var index = snapshot.val().length;
		listref.push(reviews.push(review).key);
		res.status(200);
		res.send();
	})
}
	
exports.getReviewByListing = function(req, res){
	var listing_id = req.params.listing_id;
	var listing = db.ref('listings')
	listing.once("value", function (snapshot){
		var data = snapshot.val();
		if (listing_id > data.length || listing_id < 0) {
			res.status(418);
			res.json({"message": "invalid"});
			res.send();
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
			res.send();
		});

	})
}
	
exports.getReviewById = function(req, res){
	var review_id = req.params.review_id;
	reviews.once("value", function (snapshot) {
		var result = snapshot.val()[review_id];
		res.status(200);
		res.json(result);
		res.send();
	})
}
	
exports.updateReviewById = function(req, res){
	var review_id = req.params.review_id;
	var review = db.ref("reviews/" + review_id);
	review.set({
		review_text: req.params.review_text,
		listing_id: req.params.listing_id,
		rating: req.params.rating
	});
	res.status(200);
	res.send();

}
	
	
	
	
	
	
	
	
	
	
	
	