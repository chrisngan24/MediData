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

exports.getVillageByPhoneNumber = function(req, res){
	var phoneNumber = req.params.phoneNumber;
	dbGet.getVillageByPhoneNumber(phoneNumber, function(village){
		console.log(village);
		res.send(village);
	})
}

exports.pushVillage = function(req, res){

	dbPush.pushVillage(req.body.village, function(){
		console.log('added village data');
	});
}

exports.registerNumber = function(req, res){
	var phoneNumber = req.body.phoneNumber;
	var village = phoneNumber;
	dbPush.pushVillage(village, function(){
		console.log('village registered');
	})
}