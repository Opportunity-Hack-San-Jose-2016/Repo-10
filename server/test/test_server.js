var chai = require('chai');
var server = require('../server.js')
var assert = chai.assert;
var request = require('supertest')


describe('test suite for server.js', function(done){
	it('GETs the API endpoint at /api/v1/listings', function(done){
		request(server).get('/api/v1/listings').end(function(err, res){
			assert.equal(res.status, 200, 'Status was not 200 OK')
			assert.isTrue(res.body.length > 0, 'Should have only 4 test listings')
//			items = ['bk', 'mcdeez', 'chipotle', 'innout']
//			for(i = 0; i < res.body.length; i++){
//				assert.isTrue(items.indexOf(res.body[i].name) >= 0, res.body[i].name + ' listing name was not found')
//			}
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
			assert.isTrue(data.length > 0, 'There was no data present under listings/id')
			done();
		});
	});
	it('GETs list of listings within x miles of location: /api/v1/listings/nearby/:distance?lat=&lng=?', function(done){
		qp = "2?lat=37.376552&lng=-121.921906" // Location of PayPal HQ
		request(server).get('/api/v1/listings/nearby/' + qp).end(function(err, res){
			assert.equal(res.status, 200, 'Status was not 200 OK')
			assert.isTrue(res.body.length > 0)
//			assert.isTrue(data.length > 0, 'There was no data present under listings/id')
			done();
		});
	});
	
	it('GETs a non-existing ID at the API endpoint: /api/v1/listings/type/:type', function(done){
		id = '12345678wehavukeyfbhksjd'
		request(server).get('/api/v1/listings/type/' + id).end(function(err, res){
			assert.equal(res.status, 200, 'Status was not 200 OK')
			assert.isTrue(data.length == 0, 'There was no data present under listings/id')
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

	it('GETs an search query at the API endpoint: /api/v1/listings/search/:keywords', function (done) {
		query = "graceful a";
		request(server).get('/api/v1/listings/search/' + encodeURI(query)).end(function(err,res){
			assert.isTrue(res.body.length > 0, 'no entries found');
			done();
		});
	});
})