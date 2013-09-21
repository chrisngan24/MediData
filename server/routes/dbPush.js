var dbConfig = require('./dbConfig');
var dbPush = require('./dbPush');

exports.pushPhoneNumberWithVillage = function(village, phoneNumber, callback){
	village['_phoneNumberId'] = phoneNumber._id;
	//phoneNumber['_villageId'] = phoneNumber._villageId;
		
	dbConfig.connectPhoneNumbers(function(phoneNumberColl){		
		phoneNumberColl.insert();
	});
	
}

exports.pushVillage = function(village, callback){
	dbConfig.connectVillage(function(villageColl){		
		villageColl.insert(village, callback);
	});
}

exports.pushPhoneNumber = function(phoneNumber, callback){
	dbConfig.connectPhoneNumber(function(phoneNumberColl){
		phoneNumberColl.insert(phoneNumber, callback);
	});
}

exports.pushDiseaseWithVillage = function(disease, village, callback){
	disease['_villageId'] = village._id;

	dbConfig.connectDisease(function(diseaseColl){
		diseaseColl.insert(disease, callback);
	})

}