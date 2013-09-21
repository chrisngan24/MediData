var dbConfig = require('./dbConfig');

exports.deleteAll = function(callback){
	dbConfig.connectVillage(function(villageColl){
		villageColl.remove({}, function(){
			dbConfig.connectDisease(function(diseaseColl){
				diseaseColl.remove({}, function(){
					callback();
				})
			})
		})
	})
}