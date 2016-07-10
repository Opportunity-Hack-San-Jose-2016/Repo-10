var chai = require('chai');
var server = require('../server.js')
var assert = chai.assert;
var request = require('supertest')


describe('test suite for server.js', function(done){
	it('GETs the API endpoint at /api/v1/listings', function(done){
		request(server).get('/api/v1/listings').end(function(err, res){
			assert.equal(res.status, 200, 'Status was not 200 OK')
			assert.isTrue(Object.keys(res.body).length > 0, 'Should have more than 0 test listings')
			done();
		});
	});
	
	it('GETs an existing ID at the API endpoint: /api/v1/listings/:id', function(done){
		id = 2
		request(server).get('/api/v1/listings/' + id).end(function(err, res){
			assert.equal(res.status, 200, 'Status was not 200 OK')
			assert.isTrue(res.body.name != null, 'Name was null')
			assert.isTrue(res.body.reviews != null, 'reviews shouldn\'t have been null')
			assert.isTrue(res.body.score != null, 'score should not be null')
			assert.isTrue(res.body.time != null, 'time should not be null')
			assert.isTrue(res.body.type != null, 'type should not be null')
			done();
		});
	});
	it('GETs an existing ID at the API endpoint: /api/v1/listings/type/:type', function(done){
		id = 'job'
		request(server).get('/api/v1/listings/type/' + id).end(function(err, res){
			assert.equal(res.status, 200, 'Status was not 200 OK')
			assert.isTrue(Object.keys(res.body).length > 0, 'There was no data present under listings/type/:type')
			done();
		});
	});
	it('POSTs at the API endpoint: /api/v1/listings', function(done){
		listingData = {
			name:'test_listing_name',
			location: {
				lat: 37.7,
				lng: -122.9
			},
			type: 'job'
		}
		request(server).post('/api/v1/listings')
			.type('form')
			.send(listingData)
			.end(function(err, res){
				assert.equal(res.status, 201, 'Status was not 201 OK')
				
				assert.isTrue(Object.keys(res.body).length > 0, 'There was no data present under listings/type/:type')
				done();
		});
	});
	it('GETs list of listings within x miles of location: /api/v1/listings/nearby/:distance?lat=&lng=?', function(done){
		qp = "2?lat=37.376552&lng=-121.921906" // Location of PayPal HQ
		request(server).get('/api/v1/listings/nearby/' + qp).end(function(err, res){
			assert.equal(res.status, 200, 'Status was not 200 OK')
			assert.isTrue(res.body.length > 0)
			done();
		});
	});
	it('GETs a non-existing ID at the API endpoint: /api/v1/listings/type/:type', function(done){
		id = '12345678wehavukeyfbhksjd'
		request(server).get('/api/v1/listings/type/' + id).end(function(err, res){
			assert.equal(res.status, 200, 'Status should have been 200 OK')
			assert.isTrue(res.body.length == 0, 'There was no data present under listings/id')
			done();
		});
	});

	it('GETs an existing ID at the API endpoint: /api/v1/reviews/id/:id', function(done){
		id = 2
		request(server).get('/api/v1/reviews/id/' + id).end(function(err, res){
			assert.equal(res.status, 200, 'Status was not 200 OK')
			assert.isTrue(res.body.listing_id != null, 'listing_id was null')
			assert.isTrue(res.body.rating != null, 'rating shouldn\'t have been null')
			assert.isTrue(res.body.review_text != null, 'review_text should not be null')
			done();
		});
	});

	it('GETs an existing ID at the API endpoint: /api/v1/reviews/listing/:id', function(done){
		id = 2
		request(server).get('/api/v1/reviews/listing/' + id).end(function(err, res){
			assert.equal(res.status, 200, 'Status was not 200 OK')
			assert.isTrue(res.body.length != 0, 'no entries found')
			done();
		});
	});
})