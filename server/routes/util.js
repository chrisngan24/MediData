exports.initializeDiseases = function(){
		
};

exports.parseTextMsg = function(textmessage, villageName){

	var diseaseObject = {};
	var diseaseComponents;
	var n = textmessage.split(",");

	for (var i = n.length - 1; i >= 0; i--) {
		diseaseComponents = n[i].split(":");
		diseaseObject[diseaseComponents[0]] = diseaseComponents[1];
		diseaseObject['Village Name'] = villageName;
	}

	return diseaseObject;

};


var makeDisease = function(name, description){

};

