var dbConfig = require('./dbConfig');

exports.updateVillage = function(village, diseases, callback){
	// dbGet.getLatestDiseases()
	dbConfig.connectDisease(function(diseaseColl){
		// diseaseColl.find({
		// 	_villageId : village._id
		// }, function(err, cursor){
			// cursor.sort(function(err, cur){
			// 	cur.toArray(function(err, array){
					//TO FIX
					village['diseases'] = [diseases];
					dbConfig.connectVillage(function(villageColl){
						console.log('updated village');
						villageColl.update(
							{
								_id : village._id
							},
							village, 
							callback
						);
					});
		// 		})

		// 	})
		// })
	});
	
}