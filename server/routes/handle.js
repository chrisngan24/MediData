var dbConfig = require('./dbConfig');
var dbGet = require('./dbGet');
var dbPush = require('./dbPush');
var dbDelete = require('./dbDelete');


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
		res.send('registered');
	})
}

exports.deleteAll = function(req, res){
	dbDelete.deleteAll(function(){
		res.send('end');
	});
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