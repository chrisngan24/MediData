var dbConfig = require('./dbConfig');
var dbPush = require('./dbPush');


exports.pushVillageWithPhoneNumber = function(village, phoneNumber, callback){
	dbConfig.connectVillage(function(villageCollection){
		village['phoneNumber'] = phoneNumber;
		dbConfig.connectPhoneNumbers(function(phoneNumberColl){		
			villageCollection.insert(village, callback);
			
		})
	});

}

exports.pushPhoneNumber = function(phoneNumber, callback){
	dbConfig.connectPhoneNumbers(function(phoneNumberColl){
		phoneNumberColl.insert(phoneNumber, callback);
	});
}

exports.pushDiseaseWithVillage = function(disease, village, callback){
	disease['_villageId'] = village._id;

	dbConfig.connectDisease(function(diseaseColl){
		diseaseColl.insert(disease, callback);
	})

}