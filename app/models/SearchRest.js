//var bcrypt = require('bcrypt-nodejs');
//var request = require('request');
//var rest_api = require('../config/rest_api');


function Search(){

}

Search.searchByUser = function(searchInput, callback) {
	url : rest_api.search + '/username/' + searchInput,
	request.post(url, {json:true}, function(err, res, body) {
			if(err)
				{
				//callback(err, res);
				callback(err, null);
				return;
				}
			if(res.statusCode === 200 && res.statusCode === 201)
				{
				callback(null, res);
				return;	
				} else
				console.log('errorcodecode' + res.statusCode);
				callback(res.body, null);
				return;
	 });


Search.searchByStatus = function(searchInput, callback) {
	url : rest_api.search + '/status/' + searchInput,
	request.post(url, {json:true}, function(err, res, body) {
		if(err)
		{
		callback(err, res);
		return;
		}
	if(res.statusCode === 200 && res.statusCode === 201)
		{
		callback(null, res);
		return;		
		} else
		console.log('errorcodecode' +res.statusCode);
		callback(res.body,null);
		return;

	});
}

Search.searchPubMsg = function(searchInput, callback) {
	url : rest_api.search + '/publicMessage/' + searchInput,
	request.post(url, {json:true}, function(err, res, body) {
		if(err)
		{
		callback(err, res);
		return;
		}
	if(res.statusCode === 200 && res.statusCode === 201)
		{
		callback(null, res);
		return;		
	
		} else
		console.log('errorcodecode' +res.statusCode);
		callback(res.body,null);
		return;
	});
}

Search.searchAnnouncement = function(searchInput, callback) {
	url : rest_api.search + '/announcement/' + searchInput,
	request.post(url, {json:true}, function(err, res, body) {
		if(err)
		{
		callback(err, res);
		return;
		}
	if(res.statusCode === 200)
		{
		callback(null, res);
		return;
		} else
	console.log('errorcodecode' +res.statusCode);
	callback(res.body,null);
	return;		
	});
}

Search.searchChats = function(searchInput, callback) {
	url : rest_api.search + '/chats/' + searchInput,
	request.post(url, {json:true}, function(err, res, body) {
		if(err)
		{
		callback(err, res);
		return;
		}
	if(res.statusCode === 200 && res.statusCode === 201)
		{
		callback(null, res);
		return;	
		
		} else
	console.log('errorcodecode' +res.statusCode);
		callback(res.body,null);
		return;

	});
	
};

}

module.exports = Search;
