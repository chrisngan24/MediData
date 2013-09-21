var db = require('./dbConfig');

var hello = {
	data : 'clement is a sexy beast'
}

exports.hello = function(req, res){
	res.send(hello);
}

