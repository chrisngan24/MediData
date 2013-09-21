var dbConfig = require('./dbConfig');

exports.deleteAll = function(callback){
	dbConfig.connectVillage(function(villageColl){
		villageColl.delete({}, function(){})
	})
}