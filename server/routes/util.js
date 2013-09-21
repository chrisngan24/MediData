exports.initializeDiseases = function(){
		
}


exports.parseDiseases = function(textmessage){

	var diseaseObject = {};
	var diseaseComponents;
	var n = textmessage.split(",");

	for (var i = n.length - 1; i >= 0; i--) {
		diseaseComponents = n[i].split(":");
		diseaseObject[diseaseComponents[0]] = diseaseComponents[1];
	};

	return diseaseObject;

}


var makeDisease = function(name, description){

}

