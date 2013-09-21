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


exports.getPhoneNumbers = function(callback){
	dbConfig.connectPhoneNumbers(function(phoneNumbersColl){
		phoneNumbersColl.find({}, function(err, cursor){
			cursor.toArray(function(err, array){
				callback(array);
			})
		})
	});
}

