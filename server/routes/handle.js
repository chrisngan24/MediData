var dbConfig = require('./dbConfig');
var dbGet = require('./dbGet');
var dbPush = require('./dbPush');



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

exports.pushVillage = function(req, res){
	dbPush.pushVillage(req.body.village, function(){
		console.log('added village data');
	});
}

exports.registerNumber = function(req, res){
	dbPush.pushPhoneNumber(req.body.phoneNumber, function(){
		console.log('number registered');
	})
}