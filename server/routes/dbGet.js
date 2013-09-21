var dbConfig = require('./dbConfig');



exports.getVillages = function(callback){
	dbConfig.connectVillage(function(village){
		village.find({}, function(err, cursor){
			cursor.toArray(function(err, array){
				callback(array);
			})
		})
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

exports.getDiseasesByQuery = function(query, callback){
	dbConfig.connectDisease(function(diseaseColl){
		console.log(query);
		diseaseColl.find(query,
			function(err, cursor){
				cursor.toArray(function(err,array){

					callback(array);
				});
			}
		)
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
