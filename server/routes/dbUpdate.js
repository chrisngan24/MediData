var dbConfig = require('./dbConfig');

exports.updateVillage = function(village, callback){
	// dbGet.getLatestDiseases()
	dbConfig.connectDisease(function(diseaseColl){
		diseaseColl.find({
			_villageId : village._id
		}, function(err, cursor){
			cursor.sort({time: -1},function(err, cur){
				cur.toArray(function(err, array){
					console.log(array[0]);
					village['diseases'] = [array[0], array[1], array[2]];
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
				})

			})
		})
	});
	
}