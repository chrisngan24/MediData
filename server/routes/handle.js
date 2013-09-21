var dbConfig = require('./dbConfig');
var dbGet = require('./dbGet');

var hello = {
	data : 'clement is a sexy beast'
}

exports.hello = function(req, res){
	res.send(hello);
}


exports.getVillages = function(req, res){
	dbGet.getVillages(function(villages){
		res.send(villages);
	})

}

