# API Endpoints
	
- `/api/v1`
  - `/listings` - GET all listings, POST a single listing
    - `/listings/id/:id` - GET listing by ID
	- `/listings/type/:type` - GET listing by ID
	- `/listings/nearby/:distance?lat=&lng` GET Listings within `:distance` of `lat, lng` coordinates
  - `reviews/` - GET and PUT/POST review data (ratings, etc..)
    - `/reviews/listing/:listing_id/` - GET/POST reviews
	- `/reviews/id/:review_id/` - GET/POST reviews
  