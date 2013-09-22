var dbConfig = require('./dbConfig');
var ObjectID = require('mongodb').ObjectID;

exports.getVillages = function(callback){
	dbConfig.connectVillage(function(village){
		village.find({}, function(err, cursor){
			cursor.toArray(function(err, array){
				callback(array);
			})
		})
	});
}

exports.getVillageById = function(villageId, callback){
	dbConfig.connectVillage(function(villageColl){
		villageColl.find({_id : villageId}, function(err, cursor){
			cursor.toArray(function(err,array){
				callback(array[0]);
			})
		})
	})
}

exports.getDiseasesByQuery = function(query, callback){
	dbConfig.connectDisease(function(diseaseColl){
		console.log(query);
		diseaseColl.find(query,
			function(err, cursor){
				cursor.toArray(function(err,array){
					callback(array);
				});
			}
		);
	});
}

exports.getVillageByPhoneNumber = function(phoneNumber, callback){
	dbConfig.connectVillage(function(villageColl){
		villageColl.find({
			number : phoneNumber
		}, function(err, cursor){
			cursor.toArray(function(err, array){
				callback(array[0]);
			})
		});
	})
}

exports.getDiseasesByVillage = function(villageId, callback) {
	dbConfig.connectDisease(function(diseaseColl) {
		console.log(villageId);
		diseaseColl.find({ 
			_villageId : villageId
		}, function(err, cursor){
			cursor.sort({time:1},function(err,sorted){
				sorted.toArray(function(err,array){
					callback(array);
				})
				
			})
		});
	});
}

exports.getPhoneNumbers = function(callback){
	dbConfig.connectPhoneNumber(function(phoneNumbersColl){
		phoneNumbersColl.find({}, function(err, cursor){
			cursor.toArray(function(err, array){
				callback(array);
			})
		})
	});
}

exports.getDiseases = function(callback){
	dbConfig.connectDisease(function(diseaseColl){
		diseaseColl.find({}, function(err, cursor){
			cursor.toArray(function(err, array){
				callback(array);
			})
		})
	});
}
