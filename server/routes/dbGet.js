var dbConfig = require('./dbConfig');



exports.getVillage = function(){
	dbConfig.connectVillage(function(village){
		village.insert({
			data : "hello"
		})
	});
}

