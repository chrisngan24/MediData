var dbConfig = require('./dbConfig');
var dbGet = require('./dbGet');
var dbPush = require('./dbPush');
var dbDelete = require('./dbDelete');
var util = require('./util');



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

exports.getDiseasesByVillage = function(req, res){
	var villageId = req.params.villageId;
	console.log(villageId)
	dbGet.getDiseasesByVillage(villageId, function(village){
		console.log(village);
		res.send(village);
	})
}

exports.getVillageByPhoneNumber = function(req, res){
	var phoneNumber = req.params.phoneNumber;
	console.log(phoneNumber);
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
	var village =  req.body.phoneNumber;
	village._id = util.getUUID();
	dbPush.pushVillage(village, function(){
		res.send('registered');
	})
}

exports.deleteAll = function(req, res){
	dbDelete.deleteAll(function(){
		res.send('end');
	});
}

exports.getVillageById = function(req, res){
	villageId = req.params.villageId;
	dbGet.getVillageById(villageId, function(village){
		res.send(village);
	})
}

exports.getDiseasesByQuery = function(req,res){
	var query = req.query;
	console.log(query);
	dbGet.getDiseasesByQuery(query, function(diseases){
		res.send(diseases);
	})
}

exports.pushTextMsg = function(textMessage, callback){
	dbPush.pushTextMsg(textMessage, function(){
		console.log('message sent');
		callback();
	})
}