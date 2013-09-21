var dbConfig = require('./dbConfig');
var dbPush = require('./dbPush');
var dbGet = require('./dbGet');
var util = require('./util');

exports.pushTextMsg = function(textMessage, callback){
	var message = textMessage.message;
	var phoneNumber = textMessage.phoneNumber;
	console.log(phoneNumber);
	dbGet.getVillageByPhoneNumber(phoneNumber, function(village){
		// console.log(village);
		var diseases = util.parseTextMsg(message, village);
		console.log(diseases);		
		for (var i = 0; i < diseases.length; i++){
			dbPush.pushDisease(diseases[i], function(){
				if(i == diseases.length){
					callback();
				}
			})
		}

		// dbPush.pushDisease(diseases, 0, function(){
		// 	callback();
		// });		
	})

}

/**
 * Pushes array of diseases recursively until it is sent in time
 * @param  {[type]}   diseases [description]
 * @param  {[type]}   index    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.pushDiseaseArray = function(diseases, index, callback){
	dbPush.pushDisease(diseases[index], function(){
		console.log(index)
		index++;
		if(index >= diseases.length){
			callback();
		} else
			dbPush.pushDiseaseArray(diseases, index, callback)

	})
}


exports.pushPhoneNumberWithVillage = function(village, phoneNumber, callback){
	village['_phoneNumberId'] = phoneNumber._id;
	//phoneNumber['_villageId'] = phoneNumber._villageId;
		
	dbConfig.connectPhoneNumbers(function(phoneNumberColl){
		phoneNumberColl.insert();
	});
	
}

 
exports.pushDisease = function(disease, callback){
	dbConfig.connectDisease(function(diseaseColl){
		diseaseColl.insert(disease, callback);
	});
};


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

