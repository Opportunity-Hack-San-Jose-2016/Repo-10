
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
	})
}

exports.postReview = function(req, res){
	var review = {};
	review.review_text = req.body.review_text;
	review.rating = req.body.rating;
	review.listing_id = req.body.listing_id;
	console.log(review)
	var listref = db.ref("listings/" + review.listing_id + "/reviews");
	var reviews = db.ref("reviews");
	reviews.once("value", function(snapshot) {
		var index = snapshot.val().length;
		listref.push(reviews.push(review).key);
		res.status(200);
		res.send();
	})
}
	
exports.getReviewByListing = function(req, res){
	var listing_id = req.params.listing_id;
	var listing = db.ref('listings');
	var reviews = db.ref("reviews");
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
	db.ref("reviews/" + review_id).once("value", function (snapshot) {
		res.status(200);
		res.json(snapshot.val());
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
	
	
	
	
	
	
	
	
	
	
	
	