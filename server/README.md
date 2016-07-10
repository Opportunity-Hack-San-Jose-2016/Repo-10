## Build and Testing

### Tests

#### First time setup

If you haven't run the tests on your machine before first run the following command

	npm install

#### Running the tests

To run tests simply run the following code:

	npm test


## ENDPOINTS

### GET api/v1/reviews/listing/:listing_id

	result is in the following format, listing_id is the id of the listing, rating is the score of each review, review_text is the review itself, and id is the review's id

	[
	  {
	    "listing_id": 0,
	    "rating": 5,
	    "review_text": "This thing was great!",
	    "id": "0"
	  },
	  {
	    "listing_id": "0",
	    "rating": "3",
	    "review_text": "this blows",
	    "id": "-KMIPFIeHsMrHVEOYfOR"
	  },
	  {
	    "listing_id": "0",
	    "rating": "1",
	    "review_text": "this sucks a bit too much",
	    "id": "-KMIQJvvX8Ngr6ZrPtAo"
	  }
	]

### GET api/v1/reviews/id/:id

	result is in the following format, with the same keys as above

	{
	    "listing_id": "0",
	    "rating": "1",
	    "review_text": "this sucks a bit too much",
	    "id": "-KMIQJvvX8Ngr6ZrPtAo"
	  }
