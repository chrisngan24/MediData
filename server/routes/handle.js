var dbConfig = require('./dbConfig');
var dbGet = require('./dbGet');
var dbPush = require('./dbPush');

var hello = {
	data : 'clement is a sexy beast'
}

exports.hello = function(req, res){
	res.send(req.toString());
}


exports.getVillages = function(req, res){
	dbGet.getVillages(function(villages){
		res.send(villages);
	})
}

exports.getPhoneNumbers = function(req, res){
	dbGet.getPhoneNumbers(function(phoneNumbers){
		res.send(phoneNumbers);
	})
}

exports.getDiseases = function(req, res){
	dbGet.getDiseases(function(diseases){
		res.send(diseases);
	})
}


exports.registerNumber = function(req, res){
	dbPush.pushPhoneNumber(req.body.phoneNumber, function(){
		console.log('number registered');
	})
}